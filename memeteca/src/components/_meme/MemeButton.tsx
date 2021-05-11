import React from 'react'

interface MemeButtonProps {
    symbol: String,
    action: (arg0: any) => void
}

export default function MemeButton({symbol, action}: MemeButtonProps) {
    const BtnClass= "far " + symbol + " fa-2x"
    return (
        <div>
            <button className="like_button" onClick={action}>
                <i className={BtnClass}></i>
            </button>
        </div>
    )
}
