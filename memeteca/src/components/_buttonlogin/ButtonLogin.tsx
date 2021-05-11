import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

export default function ButtonLogin() {
    return (
        <div>
            <Link to="/login">
                    <button className="button button2">
                        LOGIN
                    </button>
                </Link>
        </div>
    )
}
