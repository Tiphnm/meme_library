import React, {useState} from 'react'
import "./meme.css"

interface MemeButtonProps {
    symbol: string,
    data?: number,
    action: (arg0: any) => void
}

export default function MemeButton({symbol, data, action}: MemeButtonProps) {

    const iconClass= "fas " + symbol + " fa-2x action-icon"
    return (
        <span>
            <p>{ data  && data }</p>
            <button className="button-action" onClick={action}>
                <i className={iconClass}></i>
            </button>
        </span>
    )
}
