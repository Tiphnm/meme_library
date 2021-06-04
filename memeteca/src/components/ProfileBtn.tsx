import React from 'react'
import useToken from "../typescript/useToken";
import {useHistory } from 'react-router-dom';

type propsProfile = {
  user: string
}
export default function ProfileBtn({user}: propsProfile) {
    /// https://eu.ui-avatars.com/api/?name=John
    const { token, setToken } = useToken();
    let history = useHistory();

    const avatarLink = "https://eu.ui-avatars.com/api/?name="+user

      /* LOGOUT FUNCTION */
  const removeToken = () => {
    localStorage.removeItem("token");
    setToken(null!);
    window.location.reload();
  };

  // AVATAR ///
  
  return (
        <div className="profile-btn">
                <span className="group1"> 
                  <img src={avatarLink} alt="avatar" className="avatar"/>
                  <p> {user}  </p>
                </span> 
                
                <span className="group2">

                <button  className="btn-logout" onClick={()=> history.push("/profile")} > Profile </button>
                <button  className="btn-logout" onClick={() => {removeToken()}} > Logout </button>
  

                </span>
              
                </div>

    )
}
