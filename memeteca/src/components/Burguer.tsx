import React from 'react'

export default function Burguer() {
    return (
    <div className="burguer">
        <button className="menu-toggle" >
            <i className="fas fa-bars fa-2x"></i>
        </button>
      <Noir />
    </div>
    )
}

function Noir(){
    return (
        <div className="noir">
            <p>HELLO</p>
        </div>
    )
}