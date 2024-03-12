const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MenuSchema = new mongoose.Schema({
    menuType: {
        type: String,
        required: [true, 'Please provide a menuTags'],
        enum: ['Kahvaltı', 'Öğlen', 'Ara', 'Akşam'],
        default: 'Öğlen'
    },
    menuMeal: {
        type: Schema.Types.ObjectId,
        ref: 'MealModel',
        required: [true, 'Please provide a menuMeal']
    },
    menuSoap: {
        type: Schema.Types.ObjectId,
        ref: 'MealModel',
        required: [true, 'Please provide a menuSoap']
    },
    menuDrink: {
        type: Schema.Types.ObjectId,
        ref: 'FoodModel',
        required: [true, 'Please provide a menuDrink']
    },
    menuFruit: {
        type: Schema.Types.ObjectId,
        ref: 'FoodModel',
        required: [true, 'Please provide a menuFruit']
    },
    menuSalad: {
        type: Schema.Types.ObjectId,
        ref: 'MealModel',
        required: [true, 'Please provide a menuSalad']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
});

const MenuModel = model('Menu', MenuSchema);

module.exports = MenuModel;