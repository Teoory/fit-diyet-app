import React, { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import { UserContext } from '../Hooks/UserContext';

import HomePage from '../Pages/HomePage';
import Privacy from '../Pages/Privacy';
import SearchPage from '../Pages/SearchPage';
import AdminPage from '../Pages/AdminPage';
import ProfilePage from '../Pages/ProfilePage';

import BreakfastPage from '../Pages/FoodPages/BreakfastPage';
import DinnerPage from '../Pages/FoodPages/DinnerPage';
import LaunchPage from '../Pages/FoodPages/LaunchPage';
import SnackPage from '../Pages/FoodPages/SnackPage';
import FoodsPage from '../Pages/FoodPages/FoodsPage';

import FoodsAddPage from '../Pages/FoodPages/FoodsAddPage';

const PrivRoutes = () => {
    const { userInfo } = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:3030/profile', {
            credentials: 'include'
        });
    }, []);

    const username = userInfo?.username;
    const tags = userInfo?.tags;

    const isAdmin = tags?.includes('admin');
    const isEditorUp = tags?.includes('editor') || tags?.includes('moderator') || isAdmin;
    
  return (
    <Routes>
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/breakfast" element={<BreakfastPage />} />
        <Route path="/launch" element={<LaunchPage />} />
        <Route path="/dinner" element={<DinnerPage />} />
        <Route path="/snack" element={<SnackPage />} />
        <Route path="/food/:id" element={<FoodsPage />} />

        {username &&
            <>
                <Route path="/profile/:username" element={<ProfilePage />} />
                {isEditorUp && <Route path="/foodadd" element={<FoodsAddPage />} />}                
            </>
        }

        {isAdmin &&   
            <>
                <Route path="/admin" element={<AdminPage />} />
            </>
        }

        <Route index path="/*" element={<HomePage />} />
    </Routes>
  )
}

export default PrivRoutes