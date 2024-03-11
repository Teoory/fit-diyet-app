import React from 'react'
import { Link } from 'react-router-dom';
import Image from '../Image';

const NewMenuf = ({_id, food}) => {
    const { name, description, calories, healthy, foodType, image } = food;
    return (
        <div className="allFoods">
            <div className="image">
                <Link to={`/food/${_id}`}>
                    <Image src={image} alt="img" loading='layz' decoding='async' />
                </Link>
            </div>
            <div className="text">
                <Link to={`/food/${_id}`}>
                    <h1>{name}</h1>
                    <p className="info">
                        <time>
                            {calories} kcal
                        </time>
                    </p>
                </Link>
                <Link to={`/food/${_id}`}>
                    <p className="summary">{description}</p>
                </Link>
            </div>
        </div>
    )
}

export default NewMenuf