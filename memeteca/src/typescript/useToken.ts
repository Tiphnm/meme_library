import { useState } from "react";

interface typeToken {
    token: String | null;
}

export default function useToken() {
  // Get the token

  function getToken() {
    console.log("GetToken is being called")
    const tokenString = localStorage.getItem("token");  
    let userToken = JSON.parse(tokenString || "{}")
    console.log(userToken.token) 
    return userToken.token
  }

  // Use the token
  function saveToken(userToken: typeToken) {
    console.log("SAVE TOKEN is being called")
    console.log("token" + userToken);
    const tokenString =  JSON.stringify(userToken);  
    localStorage.setItem("token", tokenString);
    setToken(userToken.token);
  }

  const [token, setToken] = useState(getToken());

  return {
    setToken: saveToken,
    token
  }
}
