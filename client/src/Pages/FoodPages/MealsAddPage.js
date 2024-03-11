import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Editor from '../../Components/Editor/Editor'

const MealsAddPage = () => {
    const [name, setName] = useState('');
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [calories, setCalories] = useState('');
    const [healthy, setHealthy] = useState('');
    const [files, setFiles] = useState('');
    const [foodTags, setFoodTags] = useState('');
    const [foodTaste, setFoodTaste] = useState('');
    const [foodTemp, setFoodTemp] = useState('');
    const [foodType, setFoodType] = useState('');
    const [foodMethod, setFoodMethod] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function handleSubmit(e) {
        const data = new FormData();
        data.set('name', name);
        data.set('summary', summary);
        data.set('description', description);
        data.set('calories', calories);
        data.set('healthy', healthy);
        data.set('file', files[0]);
        data.set('foodTags', foodTags);
        data.set('foodTaste', foodTaste);
        data.set('foodTemp', foodTemp);
        data.set('foodType', foodType);
        data.set('foodMethod', foodMethod);
        e.preventDefault();
        const response = await fetch('http://localhost:3030/meal', {
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

                <label>Food Summary:</label>
                <input
                type="text"
                maxLength={160}
                required
                value={summary}
                onChange={e => setSummary(e.target.value)}
                />

                <label>Food Description:</label>
                <Editor value={description} onChange={setDescription}/>

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

                <label>Food Tags:</label>
                <select
                defaultValue={'Öğlen'}
                value={foodTags}
                onChange={e => setFoodTags(e.target.value)}>
                <option value="">Seçiniz</option>
                    <option value="Kahvaltılık">Kahvaltılık</option>
                    <option value="Öğlen">Öğlen</option>
                    <option value="Ara">Ara</option>
                    <option value="Akşam">Akşam</option>
                </select>

                <label>Food Taste:</label>
                <select
                defaultValue={'tuzlu'}
                value={foodTaste}
                onChange={e => setFoodTaste(e.target.value)}>
                <option value="">Seçiniz</option>
                    <option value="tatlı">Tatlı</option>
                    <option value="tuzlu">Tuzlu</option>
                    <option value="ekşi">Ekşi</option>
                    <option value="acı">Acı</option>
                    <option value="tatlı-acı">Tatlı-acı</option>
                </select>

                <label>Food Temp:</label>
                <select
                defaultValue={'sıcak'}
                value={foodTemp}
                onChange={e => setFoodTemp(e.target.value)}>
                <option value="">Seçiniz</option>
                    <option value="sıcak">Sıcak</option>
                    <option value="soğuk">Soğuk</option>
                </select>

                <label>Food Type:</label>
                <select
                defaultValue={'diger'}
                value={foodType}
                onChange={e => setFoodType(e.target.value)}>
                <option value="">Seçiniz</option>
                    <option value="tavuk">Tavuk</option>
                    <option value="kırmızı et">Kırmızı et</option>
                    <option value="balık">Balık</option>
                    <option value="pilav">Pilav</option>
                    <option value="makarna">Makarna</option>
                    <option value="sebze">Sebze</option>
                    <option value="diger">Diğer</option>
                </select>

                <label>Food Method:</label>
                <select
                defaultValue={'fırın'}
                value={foodMethod}
                onChange={e => setFoodMethod(e.target.value)}>
                <option value="">Seçiniz</option>
                    <option value="kızartma">Kızartma</option>
                    <option value="haşlama">Haşlama</option>
                    <option value="fırın">Fırın</option>
                    <option value="ızgara">Izgara</option>
                    <option value="sote">Sote</option>
                    <option value="dizme">Dizme</option>
                    <option value="buğulama">Buğulama</option>
                    <option value="çiğ">Çiğ</option>
                    <option value="çorba">Çorba</option>
                </select>

                <label>Image:</label>
                <input 
                type="file"
                required
                onChange={e => setFiles(e.target.files)}
                />

                <button type="submit">Add Food</button>
            </form>
        </div>
    )
}

export default MealsAddPage