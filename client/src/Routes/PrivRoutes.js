import React, { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import { UserContext } from '../Hooks/UserContext';

import HomePage from '../Pages/HomePage';
import Privacy from '../Pages/Privacy';
import SearchPage from '../Pages/SearchPage';
import AdminPage from '../Pages/AdminPage';
import ProfilePage from '../Pages/ProfilePage';

import FoodsPage from '../Pages/FoodPages/FoodsPage';
import FoodsAddPage from '../Pages/FoodPages/FoodsAddPage';
import MealsPage from '../Pages/FoodPages/MealsPage';
import MealsAddPage from '../Pages/FoodPages/MealsAddPage';

import AddMenuPage from '../Pages/AddMenuPage';

import BreakfastPage from '../Pages/FoodPages/BreakfastPage';
import DinnerPage from '../Pages/FoodPages/DinnerPage';
import LaunchPage from '../Pages/FoodPages/LaunchPage';
import SnackPage from '../Pages/FoodPages/SnackPage';


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

        <Route path="/food/:id" element={<FoodsPage />} />
        <Route path="/meal/:id" element={<MealsPage />} />

        <Route path="/breakfast" element={<BreakfastPage />} />
        <Route path="/launch" element={<LaunchPage />} />
        <Route path="/dinner" element={<DinnerPage />} />
        <Route path="/snack" element={<SnackPage />} />

        {username &&
            <>
                <Route path="/profile/:username" element={<ProfilePage />} />
                {isEditorUp && <Route path="/foodadd" element={<FoodsAddPage />} />}
                {isEditorUp && <Route path="/mealsadd" element={<MealsAddPage />} />}
                {isEditorUp && <Route path="/addmenu" element={<AddMenuPage />} />}
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