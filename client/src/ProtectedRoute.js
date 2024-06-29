import React from "react";
import { Navigate } from "react-router-dom";
import pb from './pocketbase/pocketbase';

const ProtectedRoute = ({element}) => {
    if(!pb.authStore.isValid){
        return <Navigate to = "/login"/>
    }

    return element;
};

export default ProtectedRoute;  