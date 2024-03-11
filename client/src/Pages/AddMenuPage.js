import React, { useEffect, useState } from 'react';
import Foods from '../Components/MenuAdds/NewMenuf';
import Meal from '../Components/MenuAdds/NewMenus';

const AddMenuPage = () => {
    const [mealType, setMealType] = useState('');
    const [selectedFood, setSelectedFood] = useState('');
    const [selectedMeal, setSelectedMeal] = useState('');
    const [selectedSoap, setSelectedSoap] = useState('');
    const [foods, setFoods] = useState([]);
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/food').then(response => {
            response.json().then(foods => {
                setFoods(foods);
            });
        });
    }, []);

    useEffect(() => {
        fetch('http://localhost:3030/meal').then(response => {
            response.json().then(meals => {
                setMeals(meals);
            });
        });
    }, []);

    const handleMealType = (e) => {
        setMealType(e.target.value);
        setSelectedFood('');
        setSelectedMeal('');
        setSelectedSoap('');
    };

    const totalCalories = () => {
        if (selectedFood && selectedMeal && selectedSoap) {
            return selectedFood.calories + selectedMeal.calories + selectedSoap.calories;
        } else if (selectedFood && selectedMeal) {
            return selectedFood.calories + selectedMeal.calories;
        } else if (selectedFood && selectedSoap) {
            return selectedFood.calories + selectedSoap.calories;
        } else if (selectedMeal && selectedSoap) {
            return selectedMeal.calories + selectedSoap.calories;
        } else if (selectedFood) {
            return selectedFood.calories;
        } else if (selectedMeal) {
            return selectedMeal.calories;
        } else if (selectedSoap) {
            return selectedSoap.calories;
        } else {
            return 0;
        }
    };
    
    return (
        <div className="add-menu">
            <div>
              <label>Öğün Seçimi:</label>
              <select value={mealType} onChange={handleMealType}>
                <option value="">Öğün Seçiniz</option>
                <option value="kahvaltı">Kahvaltı</option>
                <option value="akşam_yemeği">Akşam Yemeği</option>
              </select>
            </div>

            {mealType === 'kahvaltı' && (
              <div>
                <label>Kahvaltı Seçimi:</label>
                <select value={(selectedFood) ? (JSON.stringify(selectedFood)) : ''} onChange={(e) => {
                    const selectedValue = e.target.value;
                    setSelectedFood(selectedValue ? JSON.parse(selectedValue) : '');
                }}>
                  <option value="">Meyve Seçiniz</option>
                  {foods.length > 0 && foods.filter(food => food.foodType === 'meyve').map(food => (
                    <option key={food._id} value={JSON.stringify(food)}>{food.name} | {food.calories} kcal</option>
                  ))}
                </select>
              </div>
            )}

            {mealType === 'akşam_yemeği' && (
              <div>
                <label>Akşam Yemeği Seçimi:</label>
                <select value={(selectedFood) ? (JSON.stringify(selectedFood)) : ''} onChange={(e) => {
                    const selectedValue = e.target.value;
                    setSelectedFood(selectedValue ? JSON.parse(selectedValue) : '');
                }}>
                  <option value="">Meyve Seçiniz</option>
                  {foods.length > 0 && foods.filter(food => food.foodType === 'meyve').map(food => (
                    <option key={food._id} value={JSON.stringify(food)}>{food.name} | {food.calories} kcal</option>
                  ))}
                </select>

                <select value={(selectedSoap && selectedSoap !== '') ? JSON.stringify(selectedSoap) : ''} onChange={(e) => {
                  const selectedValue = e.target.value;
                  setSelectedSoap(selectedValue ? JSON.parse(selectedValue) : '');
                }}>
                  <option value="">Çorba Seçiniz</option>
                  {meals.length > 0 && meals.filter(meal => meal.foodMethod === 'çorba').map(meal => (
                    <option key={meal._id} value={JSON.stringify(meal)}>{meal.name} | {meal.calories} kcal</option>
                  ))}
                </select>

                <select value={(selectedMeal) ? (JSON.stringify(selectedMeal)) : ''} onChange={(e) => {
                  const selectedValue = e.target.value;
                  setSelectedMeal(selectedValue ? JSON.parse(selectedValue) : '');
                }}>
                  <option value="">Yemek Seçiniz</option>
                  {meals.length > 0 && meals.map(meal => (
                    <option key={meal._id} value={JSON.stringify(meal)}>{meal.name} | {meal.calories} kcal</option>
                  ))}
                </select>
              </div>
            )}

            <h2>Menu</h2>
            <div>
            {selectedFood && (
              <div>
                {selectedFood.foodType === 'kahvaltılık' && <h3>Kahvaltılık</h3>}
                {selectedFood.foodType === 'meyve' && <h3>Meyve</h3>}
                <Foods food={selectedFood} />
              </div>
            )}

            {selectedSoap && (
              <div>
                <h3>çorba</h3>
                <Meal meal={selectedSoap} />
              </div>
            )}

            {selectedMeal && (
              <div>
                <h3>Ana Yemek</h3>
                <Meal meal={selectedMeal} />
              </div>
            )}
            </div>

            <div>
              <h2>Toplam Kalori: {totalCalories()} kcal</h2>
            </div>

        </div>
    )
}

export default AddMenuPage