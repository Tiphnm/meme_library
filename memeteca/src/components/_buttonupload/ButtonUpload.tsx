import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

export default function ButtonUpload() {
    return (
        <div>
            <Link to="/upload">
                    <button className="button button1" >
                        UPLOAD
                    </button>
            </Link>
        </div>
    )
}
