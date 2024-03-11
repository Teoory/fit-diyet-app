import { useContext, useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { UserContext } from '../../Hooks/UserContext';
import Image from '../../Components/Image';
import '../../QuillSnow.css';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

const MealsPage = () => {
    const { user } = useContext(UserContext);
    const [meal, setMeal] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3030/meal/${id}`)
            .then(response => response.json())
            .then(data => setMeal(data));
    }, [id]);

    // useEffect(() => {
    //     fetch(`http://localhost:3030/meal/${id}`)
    //     .then(response => {
    //         if(response.ok) {
    //             setRedirect(true);
    //             return;
    //         }
    //         response.json().then(meal => {
    //             setMeal(meal);
    //         })
    //     })
    // }, [id]);
    
    if(!meal) return <div>Loading...</div>
    const locales = { tr };
    return (
        <div className="post-page">
            <div className="image">
                <Image src={meal.image} alt="img" loading='layz' decoding='async' />
            </div>
            <div className="text">
                <h1>{meal.name}</h1>
                <p className="summary">{meal.summary}</p>
                <p className="info">
                    <time>
                        {meal.calories} kcal
                    </time>
                    <div>
                        Sağlık: {meal.healthy} / 5
                    </div>
                    <div>
                        Öğün: {meal.foodTags}
                    </div>
                    <div>
                        Tad: {meal.foodTaste}
                    </div>
                    <div>
                        Sıcaklık: {meal.foodTemp}
                    </div>
                    <div>
                        Ürün: {meal.foodType}
                    </div>
                    <div>
                        Yapılış: {meal.foodMethod}
                    </div>
                    <time>
                        Paylaşım zamanı: 
                        {format(new Date(meal.createdAt), 'dd MMMM yyyy', {locale: tr} )}
                    </time>
                </p>
                {/* <p className="summary">{meal.description}</p> */}
                <div className="content" dangerouslySetInnerHTML={{__html:meal.description}} />
            </div>
        </div>
    )
}

export default MealsPage