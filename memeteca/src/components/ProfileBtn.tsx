import React from 'react'
import useToken from "../typescript/useToken";


export default function ProfileBtn(props: any) {
    /// https://eu.ui-avatars.com/api/?name=John
    const { token, setToken } = useToken();

      /* LOGOUT FUNCTION */
  const removeToken = (token: String | null) => {
    localStorage.removeItem("token");
    setToken(null!);
    window.location.reload();
  };


    return (
        <div className="profile-btn">
                  <p> {props.user}  </p>
                  <button  className="btn-logout" onClick={() => {removeToken(token)}} > Logout </button>
                </div>

    )
}
