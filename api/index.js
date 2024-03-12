const cors = require ('cors');
const mongoose = require ('mongoose');
const User = require ('./models/User');
const FoodModel = require ('./models/FoodModel');
const MealModel = require ('./models/MealModel');
const MenuModel = require ('./models/MenuModel');

const express = require ('express');
const bcrypt = require ('bcryptjs');
const app = express ();
const jwt = require ('jsonwebtoken');
const cookieParser = require ('cookie-parser');
const multer = require ('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const uploadMiddleware = multer({dest: '/tmp'});
const uploadProfilePhoto = multer({dest: '/tmp'});
const path = require ('path');
const fs = require ('fs');
const logoPath = path.join(__dirname, 'logo.png');
const sesion = require ('express-session');
require ('dotenv').config ();

const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET;

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3030'],
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization'
};

app.use (cors (corsOptions));
app.use (express.json ());
app.use (cookieParser ());

app.use (sesion ({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

mongoose.connect (process.env.MONGODB_URL);
const bucket = 'fit-diyet-app';

async function uploadToS3 (path, originalname, mimetype) {
    const client = new S3Client({
        region: 'eu-central-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_KEY
        }
    });
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newFileName = `${Date.now()}_${Math.random().toString(36).substring(6)}.${ext}`;
    await client.send(new PutObjectCommand({
        Bucket: bucket,
        Body: fs.readFileSync(path),
        Key: 'uploads/' + newFileName,
        contentType: mimetype,
        ACL: 'public-read',
    }))
    return `https://${bucket}.s3.eu-central-1.amazonaws.com/uploads/${newFileName}`;
}

async function uploadPpToS3 (path, originalname, mimetype) {
    const client = new S3Client({
        region: 'eu-central-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_KEY
        }
    });
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newFileName = `${Date.now()}_${Math.random().toString(36).substring(6)}.${ext}`;
    await client.send(new PutObjectCommand({
        Bucket: bucket,
        Body: fs.readFileSync(path),
        Ket: 'profilePhotos/' + newFileName,
        ContentType: mimetype,
        ACL: 'public-read'
    }));
    return `https://${bucket}.s3.eu-central-1.amazonaws.com/profilePhotos/${newFileName}`;
}

//? Register & Login
app.post ('/register', async (req, res) => {
    const {username, password, email} = req.body;
    try {
        const userDoc = await User.create({
            username,
            email,
            password:bcrypt.hashSync(password, salt),
            tags: ['user'],
        })
        res.json(userDoc);
    } catch (e) {
        res.status(400).json(e);
    }
});

app.post ('/login', async (req, res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    if (!userDoc) {
        return res.redirect('/login');
    }
    const  passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk){
        jwt.sign({username, profilePhoto:userDoc.profilePhoto , email:userDoc.email, tags:userDoc.tags, id:userDoc._id}, secret, {} , (err, token) => {
            if (err) {
                console.error('Token oluşturulamadı:', err);
                return res.status(500).json({ error: 'Token oluşturulamadı' });
            }

            res.cookie('token', token,{sameSite: "none", maxAge: 24 * 60 * 60 * 1000, httpOnly: false, secure: true}).json({
                id:userDoc._id,
                username,
                email:userDoc.email,
                tags:userDoc.tags,
                profilePhoto: userDoc.profilePhoto,
            });
            console.log('Logged in, Token olusturuldu.', token);
        });
    }else{
        res.status(400).json({message: 'Wrong password'});
    }
});

app.post ('/logout', (req, res) => {
    res.clearCookie('token').json({message: 'Logged out'});
});

//? Profile
app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if(err) throw err;
        res.json(info);
    });
});

app.get('/profile/:username', async (req, res) => {
    const { username } = req.params;
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 });
  
      res.json({ user, posts });
    } catch (error) {
      console.error('Error getting user profile:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

//? Profile Photo
app.post('/profilePhoto', uploadProfilePhoto.single('file'), async (req, res) => {
    const pp = [];
    const {originalname,path,mimetype} = req.file;
    const url = await uploadPpToS3(path, originalname, mimetype);
    pp.push(url);

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if(err) throw err;

        const userDoc = await User.findById(info.id);
        userDoc.profilePhoto = url;
        await userDoc.save();
        res.json(userDoc);
    });
});

app.put('/profilePhoto', uploadProfilePhoto.single('file'), async (req, res) => {
    const pp = [];
    let newPath = null; 
    if(req.file) {
        const {originalname,path,mimetype} = req.file;
        // const parts= originalname.split('.');
        // const ext = parts[parts.length - 1];
        // newPath = path + '.' + ext;
        // fs.renameSync(path, newPath);
        const url = await uploadPpToS3(path, originalname, mimetype);
        pp.push(url);
    }

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if(err) throw err;

        const userDoc = await User.findById(info.id);
        // const newFileName = `${userDoc.username}_profilePhoto.${ext}`;
        // const newPath = path + newFileName;

        fs.renameSync(path, newPath);
        userDoc.profilePhoto = url;
        
        // userDoc.profilePhoto = newPath?newPath:userDoc.profilePhoto;
        await userDoc.save();
        res.json(userDoc);
    });
});

app.get('/profilephoto', async (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if(err) throw err;
        const userDoc = await User.findById(info.id);
        res.json(userDoc.profilePhoto);
    });
});

//? DarkMode
app.put('/darkmode', async (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if(err) throw err;
        const userDoc = await User.findById(info.id);
        userDoc.darkMode = !userDoc.darkMode;
        await userDoc.save();
        res.json(userDoc.darkMode);
    });
});

app.get('/darkmode', async (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if(err) throw err;
        const userDoc = await User.findById(info.id);
        res.json(userDoc.darkMode);
    });
});

//? Search
app.get('/search/:keyword', async (req, res) => {
    const {keyword} = req.params;
    const foodDoc = await FoodModel.find({name: {$regex: keyword, $options: 'i'}});
    const mealDoc = await MealModel.find({name: {$regex: keyword, $options: 'i'}});
    res.json([...foodDoc, ...mealDoc]);
});

//? Tags
app.get('/tags', async (req, res) => {
    res.json(
        await User.find({},'tags')
    );
});

app.get('/tags/:tag', async (req, res) => {
    const {tag} = req.params;
    res.json(
        await User.find({tags: tag},'username email tags')
    );
});

//!Admin
const isAdmin = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Kullanıcı etiketlerini kontrol et
        if (info.tags.includes('admin')) {
            next(); // Yetkilendirme başarılı
        } else {
            res.status(403).json({ error: 'Forbidden' });
        }
    });
};


app.get('/users', isAdmin, async (req, res) => {
    res.json(
        await User.find({},'username email tags')
        .sort({createdAt: -1})
    );
});

app.post('/changeTag', async (req, res) => {
    const {username, newTag} = req.body;
    const userDoc = await User.findOne({username});
    userDoc.tags = [newTag];
    await userDoc.save();
    res.json(userDoc);
});



//? Tekil yiyecekler
app.get('/food', async (req, res) => {
    res.json(
        await FoodModel.find()
    );
});

app.get('/food/:id', async (req, res) => {
    const {id} = req.params;
    const foodDoc = await FoodModel.findById(id);
    res.json(foodDoc);
});

app.post('/food', uploadMiddleware.single('file'), async (req, res) => {
    const cover = [];
    const {originalname,path,mimetype} = req.file;
    const url = await uploadToS3(path, originalname, mimetype);
    cover.push(url);

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if(err) throw err;

        const {name, description, calories, healthy, foodType} = req.body;
        const foodDoc = await FoodModel.create({
            name,
            description,
            calories,
            healthy,
            foodType,
            image: url,
        });
        res.json(foodDoc);
    });
});

//? Ana Yemek
app.get('/meal', async (req, res) => {
    res.json(
        await MealModel.find()
    );
});

app.get('/meal/:id', async (req, res) => {
    const {id} = req.params;
    const mealDoc = await MealModel.findById(id);
    res.json(mealDoc);
});

app.post('/meal', uploadMiddleware.single('file'), async (req, res) => {
    const cover = [];
    const {originalname,path,mimetype} = req.file;
    const url = await uploadToS3(path, originalname, mimetype);
    cover.push(url);

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if(err) throw err;

        const {id, name, summary, description, calories, healthy, foodTags, foodTaste, foodTemp, foodType, foodMethod} = req.body;
        const mealDoc = await MealModel.create({
            name,
            summary,
            description,
            calories,
            healthy,
            foodTags,
            foodTaste,
            foodTemp,
            foodType,
            foodMethod,
            image: url,
        });
        res.json(mealDoc);
    });
});

//? Menü
app.get('/menu', async (req, res) => {
    res.json(
        await MenuModel.find()
    );
});

app.get('/menu/:id', async (req, res) => {
    const {id} = req.params;
    const menuDoc = await MenuModel.findById(id);
    res.json(menuDoc);
});

app.post('/menu', async (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if(err) throw err;

        const {menuType, menuMeal, menuSoap, menuDrink, menuFruit, menuSalad} = req.body;
        const menuDoc = await MenuModel.create({
            menuType,
            menuMeal,
            menuSoap,
            menuDrink,
            menuFruit,
            menuSalad,
        });
        res.json(menuDoc);
    });
});



//! Listen to port 3030
app.listen(3030, () => {
    console.log('Server listening on port 3030 || nodemon index.js')
});