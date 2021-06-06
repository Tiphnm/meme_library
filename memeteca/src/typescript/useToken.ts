import { useState } from "react";

interface typeToken {
    token: string | null;
}

export default function useToken() {
  // Get the token

  function getToken() {
    console.log("GetToken is being called")
    const tokenString = localStorage.getItem("token");  
    console.log(tokenString)
    let userToken = JSON.parse(tokenString!)
    console.log(userToken) 
    return userToken
  }

  // Use the token
  function saveToken(userToken: typeToken) {
    console.log("SAVE TOKEN is being called token " + userToken)
 
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
