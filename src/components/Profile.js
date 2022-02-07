import React, { useState, useEffect } from 'react';
import AuthenticatedProfile from './AuthenticatedProfile';


const Profile = () => {
    const userToken = localStorage.getItem("userToken")

    return (
        <>
            {
                userToken ? <AuthenticatedProfile /> : <h1>"You need to LogIn"</h1>
            }
        </>
    )
}

export default Profile;

