const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    summary: {
        type: String,
        required: [true, 'Please provide a summary']
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
    foodTags: {
        type: String,
        required: [true, 'Please provide a foodTags'],
        enum: ['Kahvaltılık', 'Öğlen', 'Ara', 'Akşam'],
        default: 'Öğlen'
    },
    foodTaste: {
        type: String,
        required: [true, 'Please provide a foodSalt'],
        enum: ['tatlı', 'tuzlu', 'ekşi', 'acı', 'tatlı-acı'],
        default: 'tatlı'
    },
    foodTemp: {
        type: String,
        required: [true, 'Please provide a foodTemp'],
        enum: ['sıcak', 'soğuk'],
        default: 'sıcak'
    },
    foodType: {
        type: String,
        required: [true, 'Please provide a foodType'],
        enum: ['tavuk', 'kırmızı et', 'balık', 'pilav', 'makarna', 'sebze', 'diger'],
        default: 'diger'
    },
    foodMethod: {
        type: String,
        required: [true, 'Please provide a foodMethod'],
        enum: ['kızartma', 'haşlama', 'fırın', 'ızgara', 'sote', 'dizme', 'buğulama', 'çiğ', 'çorba', 'salata'],
        default: 'kızartma'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
});

const MealModel = model('Meal', MealSchema);

module.exports = MealModel;