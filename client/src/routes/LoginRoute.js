import React from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import pb from '../pocketbase/pocketbase';
import { Navigate } from 'react-router-dom';

const LoginRoute = () => {
    if(pb.authStore.isValid){
        return <Navigate to="/files" />
    }
    return (
        <div>
            <h1 class="title">Welcome to Filenite</h1>
            <Login />
            <Signup />
        </div>
    );
};

export default LoginRoute;
