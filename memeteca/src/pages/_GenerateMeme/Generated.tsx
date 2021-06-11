import React from 'react'

// Interface for Result component
interface ResultInterface {
    resultContainerRef?: React.RefObject<any>;
  }

export default function Generated(props:ResultInterface) {
    return (
        <div>
              <div ref={props.resultContainerRef} className="result">
                  Meme generated
              </div>
        </div>
    )
}
