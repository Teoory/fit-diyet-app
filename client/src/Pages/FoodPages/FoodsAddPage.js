import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const FoodsAddPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [calories, setCalories] = useState('');
    const [healthy, setHealthy] = useState('');
    const [files, setFiles] = useState('');
    const [foodType, setFoodType] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function handleSubmit(e) {
        const data = new FormData();
        data.set('name', name);
        data.set('description', description);
        data.set('calories', calories);
        data.set('healthy', healthy);
        data.set('file', files[0]);
        data.set('foodType', foodType);
        e.preventDefault();
        const response = await fetch('http://localhost:3030/food', {
            method: 'POST',
            body: data,
            credentials: 'include',
        });
        if (response.ok) {
            console.log('Food added');
            setRedirect(true);
        }
    }

    if(redirect) {
        return <Navigate to={'/'}/>
    }
  return (
    <div className="add-food">
        <h2>Add a New Food</h2>
        <form onSubmit={handleSubmit}>
            <label>Food Name:</label>
            <input 
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            />

            <label>Food Description:</label>
            <input 
            type="text"
            required
            value={description}
            onChange={e => setDescription(e.target.value)}
            />

            <label>Calories:</label>
            <input 
            type="text"
            required
            value={calories}
            onChange={e => setCalories(e.target.value)}
            />

            <label>Healthy:</label>
            <input 
            type="number"
            min={1}
            max={5}
            defaultValue={3}
            required
            value={healthy}
            onChange={e => setHealthy(e.target.value)}
            />

            <label>Food Type:</label>
            <select
            value={foodType}
            defaultValue={'meyve'}
            onChange={e => setFoodType(e.target.value)}>
                <option value="">Seçiniz</option>
                <option value="meyve">Meyve</option>
                <option value="sebze">Sebze</option>
                <option value="içecek">İçecek</option>
                <option value="tatlı">Tatlı</option>
                <option value="kahvaltılık">Kahvaltılık</option>
                <option value="sos">Sos</option>
                <option value="salata">Salata</option>
                <option value="çorba">Çorba</option>
            </select>

            <label>Food Image:</label>
            <input
            type='file'
            onChange={e => setFiles(e.target.files)}/>
            <button>Add Food</button>
        </form>
    </div>
  )
}

export default FoodsAddPage