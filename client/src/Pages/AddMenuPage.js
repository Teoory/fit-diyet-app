import React, { useEffect, useState } from 'react';
import Foods from '../Components/MenuAdds/NewMenuf';
import Meal from '../Components/MenuAdds/NewMenus';

const AddMenuPage = () => {
    const [menuType, setMenuType] = useState('');
    const [newFood, setNewFood] = useState(0);
    const [selectedFoods, setSelectedFoods] = useState(Array.from({ length: newFood }, () => ''));
    const [selectedFood, setSelectedFood] = useState('');
    const [selectedMeal, setSelectedMeal] = useState('');
    const [selectedSoap, setSelectedSoap] = useState('');
    const [selectedSweet, setSelectedSweet] = useState('');
    const [selectedDrink, setSelectedDrink] = useState('');
    const [selectedSalad, setSelectedSalad] = useState('');
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
        setMenuType(e.target.value);
        setSelectedFoods(Array.from({ length: newFood }, () => ''));
        setSelectedFood('');
        setSelectedMeal('');
        setSelectedSoap('');
        setSelectedSweet('');
        setSelectedDrink('');
        setSelectedSalad('');
    };

    const totalCalories = () => {
        let total = 0;
        if (selectedFoods) {
            selectedFoods.forEach(food => {
                if (food) total += food.calories;
            });
        }
        if (selectedFood) total += selectedFood.calories;
        if (selectedMeal) total += selectedMeal.calories;
        if (selectedSoap) total += selectedSoap.calories;
        if (selectedSweet) total += selectedSweet.calories;
        if (selectedDrink) total += selectedDrink.calories;
        if (selectedSalad) total += selectedSalad.calories;
        return total;
    };

    const addMoreFood = () => {
        setNewFood(newFood + 1);
    };
    const removeFood = () => {
        setNewFood(newFood - 1);
        selectedFoods.pop(1);
    };
    
    return (
        <div className="add-menu">
            <div>
              <label>Öğün Seçimi:</label>
              <select value={menuType} onChange={handleMealType}>
                <option value="">Öğün Seçiniz</option>
                <option value="kahvaltı">Kahvaltı</option>
                <option value="akşam_yemeği">Akşam Yemeği</option>
              </select>
            </div>

            {menuType === 'kahvaltı' && (
              <div>
                <label>Kahvaltı Seçimi:</label>
                <select value={(selectedFood) ? (JSON.stringify(selectedFood)) : ''} onChange={(e) => {
                  const selectedValue = e.target.value;
                    setSelectedFood(selectedValue ? JSON.parse(selectedValue) : '');
                }}>
                  <option value="">Kahvaltılık Seçiniz</option>
                  {foods.length > 0 && foods.filter(food => food.foodType === 'kahvaltılık').map(food => (
                    <option key={food._id} value={JSON.stringify(food)}>{food.name} | {food.calories} kcal</option>
                    ))}
                </select>
                    <div className="addMenuButtons">
                      <button className='success' onClick={addMoreFood}>Kahvaltılık ekle</button>
                      {newFood >= 1 && <button className='danger' onClick={removeFood}>Kahvaltılık azalt</button>}
                      {/* <button className='danger' onClick={removeFood}>Kahvaltılık azalt</button> */}
                    </div>
                {newFood > 0 && <label className='totalBreakfast'>Kahvaltılık Sayısı: {newFood}</label>}
                    {[...Array(newFood)].map((_, i) => (
                      <div key={i}>
                        <label>Kahvaltılık Seçimi:</label>
                        <select value={(selectedFoods[i]) ? (JSON.stringify(selectedFoods[i])) : ''} onChange={(e) => {
                            const selectedValue = e.target.value;
                            const updatedSelectedFood = [...selectedFoods];
                            updatedSelectedFood[i] = selectedValue ? JSON.parse(selectedValue) : '';
                            setSelectedFoods(updatedSelectedFood);
                        }}>
                          <option value="">Kahvaltılık Seçiniz</option>
                          {foods.length > 0 && foods.filter(food => (food.foodType === 'kahvaltılık' || food.foodType === 'sebze' || food.foodType === 'meyve')).map(food => (
                            <option key={food._id} value={JSON.stringify(food)}>{food.name} | {food.calories} kcal</option>
                          ))}
                        </select>
                      </div>
                    ))}
              </div>
            )}

            {menuType === 'akşam_yemeği' && (
              <div>
                <label>Akşam Yemeği Seçimi:</label>
                <select value={(selectedFood) ? (JSON.stringify(selectedFood)) : ''} onChange={(e) => {
                    const selectedValue = e.target.value;
                    setSelectedFood(selectedValue ? JSON.parse(selectedValue) : '');
                }}>
                  <option value="">Içecek Seçiniz</option>
                  {foods.length > 0 && foods.filter(food => food.foodType === 'içecek').map(food => (
                    <option key={food._id} value={JSON.stringify(food)}>{food.name} | {food.calories} kcal</option>
                  ))}
                </select>

                <select value={(selectedSalad && selectedSalad !== '') ? JSON.stringify(selectedSalad) : ''} onChange={(e) => {
                  const selectedValue = e.target.value;
                  setSelectedSalad(selectedValue ? JSON.parse(selectedValue) : '');
                }}>
                  <option value="">Salata Seçiniz</option>
                  {meals.length > 0 && meals.filter(meal => meal.foodMethod === 'salata').map(meal => (
                    <option key={meal._id} value={JSON.stringify(meal)}>{meal.name} | {meal.calories} kcal</option>
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

                <select value={(selectedMeal && selectedMeal !== '') ? JSON.stringify(selectedMeal) : ''} onChange={(e) => {
                  const selectedValue = e.target.value;
                  setSelectedMeal(selectedValue ? JSON.parse(selectedValue) : '');
                }}>
                  <option value="">Yemek Seçiniz</option>
                  {meals.length > 0 && meals.filter(meal => (meal.foodMethod !== 'çorba' && meal.foodTaste !== 'tatlı')).map(meal => (
                    <option key={meal._id} value={JSON.stringify(meal)}>{meal.name} | {meal.calories} kcal</option>
                  ))}
                </select>

                <select value={(selectedSweet && selectedSweet !== '') ? JSON.stringify(selectedSweet) : ''} onChange={(e) => {
                  const selectedValue = e.target.value;
                  setSelectedSweet(selectedValue ? JSON.parse(selectedValue) : '');
                }}>
                  <option value="">Tatlı Seçiniz</option>
                  {meals.length > 0 && meals.filter(meal => meal.foodTaste === 'tatlı').map(meal => (
                    <option key={meal._id} value={JSON.stringify(meal)}>{meal.name} | {meal.calories} kcal</option>
                  ))}
                </select>

                {/* <select value={(selectedMeal) ? (JSON.stringify(selectedMeal)) : ''} onChange={(e) => {
                  const selectedValue = e.target.value;
                  setSelectedMeal(selectedValue ? JSON.parse(selectedValue) : '');
                }}>
                  <option value="">Yemek Seçiniz</option>
                  {meals.length > 0 && meals.map(meal => (
                    <option key={meal._id} value={JSON.stringify(meal)}>{meal.name} | {meal.calories} kcal</option>
                  ))}
                </select> */}
              </div>
            )}

            <h2>Menu</h2>
            <div>
            <div className="menuArea">
              {(selectedFood) && (
                <div>
                  {!selectedFoods && selectedFood.foodType === 'kahvaltılık' && <h3>Kahvaltılık</h3>}
                  {selectedFoods && selectedFood.foodType === 'meyve' && <h3>Meyve</h3>}
                  {selectedFoods && selectedFood.foodType === 'içecek' && <h3>Içecek</h3>}
                  <Foods food={selectedFood} />
                </div>
              )}

              {selectedFoods && selectedFoods.map((food, i) => (
                <div key={i}>
                  {food && <Foods food={food} />}
                </div>
              ))}
            </div>

            {selectedSalad && (
              <div>
                <h3>Salata</h3>
                <Meal meal={selectedSalad} />
              </div>
            )}

            {selectedSoap && (
              <div>
                <h3>Çorba</h3>
                <Meal meal={selectedSoap} />
              </div>
            )}

            {selectedMeal && (
              <div>
                <h3>Ana Yemek</h3>
                <Meal meal={selectedMeal} />
              </div>
            )}

            {selectedSweet && (
              <div>
                <h3>Tatlı</h3>
                <Meal meal={selectedSweet} />
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