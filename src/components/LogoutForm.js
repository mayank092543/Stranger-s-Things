import React, { useState, useEffect } from 'react';

const LogoutForm = () => {
    const [posts, setPosts] = useState([]);
    localStorage.clear();

    return (
    
        <h1>You have been LogOut</h1>
    )
}

export default LogoutForm;