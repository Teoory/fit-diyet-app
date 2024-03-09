import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../Hooks/UserContext';
import Image from './Image';
import logo from '../Images/logo.svg';
import './Header.css';

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [ showDropdown, setShowDropdown ] = useState(false);
  const [ profilePhoto, setProfilePhoto ] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3030/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    })
  }, []);

  function logout() {
    fetch('http://localhost:3030/logout', {
      method: 'POST',
      credentials: 'include',
    }).then(() => {
      setUserInfo(null);
    });
  }

  const getProfilePhoto = () => {
    fetch('http://localhost:3030/profilePhoto', {
      credentials: 'include',
    }).then(response => response.json())
      .then(data => {
        setProfilePhoto(data);
      })
      .catch(error => console.error('Error fetching profile photo:', error));
  };

  const username = userInfo?.username;
  const tags = userInfo?.tags;

  const isAdmin = tags?.includes('admin');
  const isEditorUp = tags?.includes('editor') || isAdmin;
  const isUser = tags?.includes('user');

  window.onscroll = function() {scrollFunction()};
  let lastScrollTop = 0;
  let scrollUpOnce = false;

  function scrollFunction() {
    let st = window.scrollY || document.documentElement.scrollTop;
    if (document.querySelector("header") === null) return;
    const header = document.querySelector(".header");

    header.style.transition = "transform 0.5s ease";
    
    if (st < 200) {
      header.style.position = "relative";
      header.style.transform = "translateY(0%)";
      header.style.zIndex = "999999";
      scrollUpOnce = false;
    }
    else if (st > lastScrollTop) {
        header.style.position = "relative";
        header.style.transform = "translateY(-100%)";
        header.style.zIndex = "1000";
        scrollUpOnce = false;
    } else {
      header.style.position = "fixed";
      header.style.transform = "translateY(0)";
      header.style.width = "100%";
      header.style.zIndex = "1000";
      scrollUpOnce = true;
    }
    lastScrollTop = st <= 0 ? 0 : st; // negatif scroll
  }

  userInfo && getProfilePhoto();
  return (
    <>
    <div className="header">
      <header>
        <Link to="/" className="logo"><img alt='logo' className='logo' src={logo} /></Link>
        <nav>
        {username ? (
        <>
            <div className='UDropdown'>
                <Link to="/search" className='searchButton' style={{display:"flex"}}>
                    <div className="searchArea">
                        <span>Ara</span>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{width:"25px", height:"25px"}} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                </Link>
            </div>
            <div className="dropdowns">
                <div className="UDropdown">
                    <Link className='dropbtn' onClick={() => setShowDropdown(!showDropdown)}>
                        <div className="header-username">
                            Öğünler
                        </div>
                    </Link>
                    {showDropdown && (
                        <div className="dropdown-content">
                            <Link to="/breakfast">
                                <span>🍳</span>
                                Kahvaltı
                            </Link>
                            <Link to="/launch">
                                <span>🍛</span>
                                Öğlen
                            </Link>
                            <Link to="/snack">
                                <span>🥜</span>
                                Ara
                            </Link>
                            <Link to="/dinner">
                                <span>🍗</span>
                                Akşam
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            {/* PROILE EDIT BUTONU */}
            <div className="login-button">
                <div className="dropdown">
                    <a className="dropbtn" onClick={() => setShowDropdown(!showDropdown)}>
                    {profilePhoto ? (
                        <Image src={profilePhoto} className='ProfilePhoto' />
                    ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                    )}
                    <span>{username}</span>
                    </a>
                    {showDropdown && (
                        <div className="dropdown-content2">
                          {isAdmin && (
                            <Link to="/admin" className='AdminButton'>Admin</Link>
                          )}
                          <Link to={`/profile/${username}`}>Profile</Link>
                          <Link to="/settings">Settings</Link>
                          <a onClick={logout}>Logout</a>
                        </div>
                    )}
                </div>
            </div>
        </>
        ) : (
        <> 
        {/* EGER GIRIS YAPILMAMISSA  */}
            
        <div className='UDropdown'>
                <Link to="/search" className='searchButton' style={{display:"flex"}}>
                    <div className="searchArea">
                        <span>Ara</span>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{width:"25px", height:"25px"}} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                </Link>
            </div>
            <div className="dropdowns">
                <div className="UDropdown">
                    <Link className='dropbtn' onClick={() => setShowDropdown(!showDropdown)}>
                        <div className="header-username">
                            Öğünler
                        </div>
                    </Link>
                    {showDropdown && (
                        <div className="dropdown-content">
                            <Link to="/breakfast">
                                <span>🍳</span>
                                Kahvaltı
                            </Link>
                            <Link to="/launch">
                                <span>🍛</span>
                                Öğlen
                            </Link>
                            <Link to="/snack">
                                <span>🥜</span>
                                Ara
                            </Link>
                            <Link to="/dinner">
                                <span>🍗</span>
                                Akşam
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="login-button">
                <Link to="/login" className='login-text'>Login / Register</Link>
            </div>
        </>
        )}
        </nav>
      </header>
    </div>
    </>
  )
}

export default Header