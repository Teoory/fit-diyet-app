import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import SearchBox from '../Components/SearchBox';
import Image from '../Components/Image';

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    
    const handleSearch = async (keyword) => {
        try {
            const response = await fetch(`http://localhost:3030/search/${keyword}`);
            if (response.ok) {
                const searchData = await response.json();
                setSearchResults(searchData);
            } else {
                console.error('Error searching:', response.statusText);
            }
        } catch (error) {
            console.error('Error searching:', error.message);
        }
    };

    const [minSearchResults, setMinSearchResults] = useState(0);
    const [maxSearchResults, setMaxSearchResults] = useState(10);
    return (
        <div className='content'>
            <SearchBox onSearch={handleSearch} />
            <div>
                {searchResults.slice(minSearchResults, maxSearchResults).map((result) => (
                    <Link style={{textDecoration: "none"}} to={"/food/"+result._id} key={result._id}>
                        <div className="post">
                            <div className="image">
                                <Image src={result.image} alt="img" loading='layz' decoding='async' />
                            </div>
                            <div className="text">
                                <Link to={`/food/${result._id}`}>
                                    <h1>{result.name}</h1>
                                    <p className="info">
                                        <time>
                                            {result.calories} kcal
                                        </time>
                                    </p>
                                </Link>
                                <Link to={`/food/${result._id}`}>
                                    <p className="summary">{result.description}</p>
                                </Link>
                            </div> 
                        </div>                        
                    </Link>
                ))}
                {searchResults.length <= 2 
                    ?   null
                    :   <div>
                            <span style={{display:"flex", justifyContent:"center"}}>Görüntülenen paylaşımlar: {minSearchResults} / {maxSearchResults}</span>
                            <div style={{display:"flex", justifyContent:"center", gap:"20px"}}>
                            {minSearchResults === 0 
                                ?   null
                                :   <button style={{width:"min-content", display:"flex", alignItems:"center",gap:"5px", padding:"5px 10px", backgroundColor:"var(--color-info-dark)", fontWeight:"600"}} onClick={() => setMinSearchResults(minSearchResults-10) + setMaxSearchResults(maxSearchResults-10)}><span style={{fontSize:"medium"}}>◀️</span> Önceki Sayfa</button>
                            }
                            {maxSearchResults >= searchResults.length
                                ?   null
                                :   <button style={{width:"min-content", display:"flex", alignItems:"center",gap:"5px", padding:"5px 10px", backgroundColor:"var(--color-info-dark)", fontWeight:"600"}} onClick={() => setMaxSearchResults(maxSearchResults+10) + setMinSearchResults(minSearchResults+10)}>Sonraki Sayfa <span style={{fontSize:"medium"}}>▶️</span></button>
                            }
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default SearchPage