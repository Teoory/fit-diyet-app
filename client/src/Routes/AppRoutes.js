import React, { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import { UserContext } from '../Hooks/UserContext';
import PrivRoutes from './PrivRoutes';
import PublicRoutes from './PublicRoutes';

const AppRoutes = () => {
    const { userInfo } = useContext(UserContext);
    const username = userInfo?.username;
    
    // if (!username === undefined) {
    //     fetch('http://localhost:3030/profile', {
    //         credentials: 'include'
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.username) {
    //             userInfo.setUserInfo(data);
    //         }
    //     });
    // }
    useEffect(() => {
        fetch('http://localhost:3030/profile', {
            credentials: 'include'
        });
    }, []);


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