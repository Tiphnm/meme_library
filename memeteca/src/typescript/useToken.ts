import { useState } from "react";

export interface typeToken {
    token: string | null;
}

export default function useToken() {
  // Get the token

  function getToken() {

    const tokenString = localStorage.getItem("token");  

    let userToken = JSON.parse(tokenString!)

    return userToken
  }

  // Use the token
  function saveToken(userToken: typeToken) {

 
    const tokenString =  JSON.stringify(userToken);  
    localStorage.setItem("token", tokenString);
    setToken(userToken);
  }

  const [token, setToken] = useState(getToken());

  return {
    setToken: saveToken,
    token
  }
}

export function logout(funcSetToken: (param: string | null ) => void) {
        /* LOGOUT FUNCTION */

          localStorage.removeItem("token");
          funcSetToken(null!);
          window.location.reload();
      
}