import React from "react";
import { logout } from '../pocketbase/pocketbase';

const Logout = () => {
    return (
        <button onClick={() => logout()}>Logout</button>
    );
};

export default Logout