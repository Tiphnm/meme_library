import react, { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token')
        if (tokenString === "String") {
            const userToken = JSON.parse(tokenString) ||'{}';
            console.log(userToken)
            return userToken?.token
        }
    };
    const [token, setToken] = useState(getToken());

    const saveToken = (userToken: { token: any; }) => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };
    return {
        setToken: saveToken,
        token
    }

}

