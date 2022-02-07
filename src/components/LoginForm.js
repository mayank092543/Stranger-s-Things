import React, { useState } from 'react';
import Posts from './Posts';

const LoginForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('https://strangers-things.herokuapp.com/api/2110-VPI-WEB-PT/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
            })
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                const token = result.data.token;
                localStorage.setItem("userToken", token);
            })
            .catch(console.error);

        setUsername("");
        setPassword("");

    }
    return (
        <>
            <h1 id="login">Log In</h1>

            <form onSubmit={handleLoginSubmit}>
                <input type="text"
                 placeholder="Username*"
                 className="userName"
                 value={username}
                 onChange={(event) => setUsername(event.target.value)}>
                </input>

                <input type="password"
                 placeholder="Password*"
                 className="password" 
                 value={password}
                 onChange={(event) => setPassword(event.target.value)}>
                </input> 

                <br></br><br></br>

                <button type="submit"
                 className="login-Btn">
                 LOG IN
                </button>

            </form>
        </>
    )
}

export default LoginForm;