import { useContext, useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { UserContext } from '../../Hooks/UserContext';
import Image from '../../Components/Image';

const FoodsPage = () => {
    const { user } = useContext(UserContext);
    const [food, setFood] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3030/food/${id}`)
            .then(response => response.json())
            .then(data => setFood(data));
    }, [id]);

    if(!food) return <div>Loading...</div>
    return (
        <div className="post-page">
            <div className="image">
                <Image src={food.image} alt="img" loading='layz' decoding='async' />
            </div>
            <div className="text">
                <h1>{food.name}</h1>
                <p className="info">
                    <time>
                        {food.calories} kcal
                    </time>
                    <div>
                        {food.healthy} / 5
                    </div>
                    <div>
                        {food.foodType}
                    </div>
                </p>
                <p className="summary">{food.description}</p>
            </div>
        </div>
    )
}

export default FoodsPage