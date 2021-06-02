import React, {useState} from 'react'
import "./meme.css"

interface MemeButtonProps {
    symbol: string,
    data?: number,
    visible?: boolean,
    action: (arg0: any) => void
}

export default function MemeButton(props: MemeButtonProps) {

    const iconClass= "fas " + props.symbol + " fa-2x action-icon"

    return (
        <span style={{ display: (props.visible? "flex": "none")}}>
            <p>{ props.data  && props.data }</p>
            <button className="button-action" onClick={props.action}>
                <i className={iconClass}></i>
            </button>
        </span>
    )
}
