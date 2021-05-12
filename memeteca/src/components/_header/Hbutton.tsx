import React, { ReactComponentElement } from 'react'
import {Link, LinkProps} from "react-router-dom"

interface btndata {
    name: string,
    link: any,
  
}


export default function Hbutton({name, link}: btndata){
    return (
        <div>
            <Link to={link}>
                <button className="button button1" >{name}</button>
             </Link>
        </div>
    )
}
