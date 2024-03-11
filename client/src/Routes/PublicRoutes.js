import React from 'react'
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import HomePage from '../Pages/HomePage';
import Privacy from '../Pages/Privacy';
import SearchPage from '../Pages/SearchPage';

import BreakfastPage from '../Pages/FoodPages/BreakfastPage';
import DinnerPage from '../Pages/FoodPages/DinnerPage';
import LaunchPage from '../Pages/FoodPages/LaunchPage';
import SnackPage from '../Pages/FoodPages/SnackPage';

import FoodsPage from '../Pages/FoodPages/FoodsPage';
import MealsPage from '../Pages/FoodPages/MealsPage';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route index path ="/*" element={<HomePage/>} />
      <Route path="/privacy" element={<Privacy/>} />
      <Route path="/search" element={<SearchPage/>} />

      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      
      <Route path="/food/:id" element={<FoodsPage />} />
      <Route path="/meal/:id" element={<MealsPage />} />

      <Route path="/launch" element={<LaunchPage/>} />
      <Route path="/breakfast" element={<BreakfastPage/>} />
      <Route path="/dinner" element={<DinnerPage/>} />
      <Route path="/snack" element={<SnackPage/>} />
    </Routes>
  )
}

export default PublicRoutes