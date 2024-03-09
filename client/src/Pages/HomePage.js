import { useEffect, useState } from 'react';
import Foods from '../Components/Foods';

const HomePage = () => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3030/food').then(response => {
      response.json().then(foods => {
        setFoods(foods);
      });
    });
  }, []);
  return (
    <>
      <h1>Home Page</h1>
      <div className="AllFoodsList">
        {foods.length > 0 && foods.map(food => (
          <Foods {...food} key={food._id}/>
        ))}
      </div>
    </>
  )
}

export default HomePage