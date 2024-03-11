import { useEffect, useState } from 'react';
import Foods from '../Components/Foods';
import Meal from '../Components/Meal';

const HomePage = () => {
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

  return (
    <>
      <h1>Home Page</h1>
      {/* <div className="AllFoodsList">
        {foods.length > 0 && foods.map(food => (
          <Foods {...food} key={food._id}/>
        ))}
      </div> */}

      <h1 style={{textAlign:'center'}}>Ana Yemek</h1>
      <div className="AllFoodsList">
        {meals.length > 0 && meals.map(meal => (
          <Meal {...meal} key={meal._id}/>
        ))}
      </div>

      <h1 style={{textAlign:'center'}}>Sebzeler</h1>
      <div className="AllFoodsList">
        {foods.length > 0 && foods.filter(food => food.foodType === 'sebze').map(food => (
          <Foods {...food} key={food._id}/>
        ))}
      </div>

      <h1 style={{textAlign:'center'}}>Meyveler</h1>
      <div className="AllFoodsList">
        {foods.length > 0 && foods.filter(food => food.foodType === 'meyve').map(food => (
          <Foods {...food} key={food._id}/>
        ))}
      </div>

      <h1 style={{textAlign:'center'}}>Kahvaltılıklar</h1>
      <div className="AllFoodsList">
        {foods.length > 0 && foods.filter(food => food.foodType === 'kahvaltılık').map(food => (
          <Foods {...food} key={food._id}/>
        ))}
      </div>

    </>
  )
}

export default HomePage