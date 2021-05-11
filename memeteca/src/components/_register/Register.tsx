import React, { useState } from 'react';
import axios from "axios"
import './Register.css'

function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleRegister = async () => {
        const url = "http://localhost:4000/register"
        await axios.post(url, {
            headers: { 'Content-Type': 'application/json' },
            credentials: {
                username,
                password
            }
        })
    }

    return (
        <div className="container-register">
            <h1 className = "title">Register Form</h1>
            <br />

            <form className="form" onSubmit={handleRegister}>
                <h1 className="title-register">Please Register</h1>
                <div className="form_username">
                    <input placeholder="Username" onChange={e => setUsername(e.target.value)}></input>
                </div>
                <div className="form_password">
                    <input placeholder="Password" type="Password" onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div className="form_button">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register; 