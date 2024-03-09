const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    calories: {
        type: Number,
        required: [true, 'Please provide a calories']
    },
    healthy: {
        type: Number,
        min: 1,
        max: 5,
        default: 3,
        required: [true, 'Please provide a healthy']
    },
    image: {
        type: String,
        default: 'https://fiyasko-blog-app.s3.eu-central-1.amazonaws.com/foodPhotos/default.jpg'
    },
    foodType: {
        type: String,
        required: [true, 'Please provide a foodType'],
        enum: ['sulu', 'katı'],
        default: 'sulu'
    }
});

const FoodModel = model('Food', FoodSchema);

module.exports = FoodModel;