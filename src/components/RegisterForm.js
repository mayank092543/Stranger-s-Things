import React, { useState } from 'react';


const RegisterForm = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmation) {
            alert("Password doesn't match")
            setPassword("")
            setConfirmation("")
        } else {
            const response = fetch('https://strangers-things.herokuapp.com/api/2110-VPI-WEB-PT/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
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
                    localStorage.setItem("userToken", token)
                })
                .catch(console.error);

            setUserName("");
            setPassword("");
            setConfirmation("");

        }

    }
    return (
        <>
            <h1 id="register">Register Form</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username"
                    value={username} className="signupUsername"
                    onChange={(event) => { setUserName(event.target.value) }}
                    minLength={4} required>
                </input>

                <input type="password" placeholder="Password"
                    value={password} className="signupPassword"
                    onChange={(event) => { setPassword(event.target.value) }}
                    minLength={6} required>
                </input>

                <input type="password" placeholder="Password Confirmation"
                    value={confirmation} className="signupconfPassword"
                    onChange={(event) => setConfirmation(event.target.value)}
                    required>
                </input>

                <br></br><br></br>

                <button type="submit" className="submit-Btn">Submit</button>
            </form>
        </>
    )
}

export default RegisterForm;