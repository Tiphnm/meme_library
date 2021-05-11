import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

export default function ButtonRegister() {
    return (
        <div>
            <Link to="/register">
                    <button className="button button2">
                        REGISTER
                    </button>
                </Link>
        </div>
    )
}
