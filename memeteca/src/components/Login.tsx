import React from 'react'; 

const Login = () => {
    return (
        <form className="form">
            <div className="form_username">
                <input placeholder="Username"></input>
            </div>
            <div className="form_password">
                <input placeholder="Password" type="Password"></input>
            </div>
            <div className="form_button">
            <button type="submit">Login</button>
            </div>
        </form>
    )
}

export default Login ; 