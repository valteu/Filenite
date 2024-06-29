import React from "react";
import pb, { logout } from '../pocketbase/pocketbase';

const Logout = () => {
    return (
        <button onClick={() => logout()}>Logout</button>
    );
};

export default Logout