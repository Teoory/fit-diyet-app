import React from 'react'
import { Link } from 'react-router-dom';
import Image from '../Image';

const NewMenus = ({_id, meal}) => {
    const {  name, summary, description, calories, healthy, image, foodTags, foodTaste, foodTemp, foodType, foodMethod, createdAt } = meal;
    return (
        <div className="allFoods">
            <div className="image">
                <Link to={`/meal/${_id}`}>
                    <Image src={image} alt="img" loading='layz' decoding='async' />
                </Link>
            </div>
            <div className="text2">
                <Link to={`/meal/${_id}`}>
                    <h1>{name}</h1>
                    <p className="info2">
                        <time className='selecteditem'>
                            {calories} kcal
                        </time>
                        <time>
                            Öğün: <span className='selecteditem'>{foodTags}</span>
                        </time>
                        <time>
                            Yapılış: <span className='selecteditem'>{foodMethod}</span>
                        </time>
                        <time>
                            Ürün: <span className='selecteditem'>{foodType}</span>
                        </time>
                    </p>
                </Link>
                <Link to={`/meal/${_id}`}>
                    <p className="summary">{summary}</p>
                </Link>
            </div>
        </div>
    )
}

export default NewMenus