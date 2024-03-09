import React, { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import { UserContext } from '../Hooks/UserContext';
import PrivRoutes from './PrivRoutes';
import PublicRoutes from './PublicRoutes';

const AppRoutes = () => {
    const { userInfo } = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:3030/profile', {
            credentials: 'include'
        });
    }, []);

    const username = userInfo?.username;

  return (
    <>
        {username
            ?   <PrivRoutes />
            :   <PublicRoutes />
        }
    </>
  )
}

export default AppRoutes