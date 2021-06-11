import React from 'react'

// Interface for Result component
interface ResultInterface {
    GeneratedContainerRef: React.RefObject<any>;
    isMemeGenerated: boolean
  }

export default function Generated(props:ResultInterface) {
    return (
        <div className="generated-container"> 

            {props.isMemeGenerated?     
            <div className="title-block"> 
            <img className="arrow" src="https://lencar.es/wp-content/uploads/2014/12/Red-animated-arrow-down.gif" alt="down arrow"/>
            <p>  Save your New meme </p>
            <img className="arrow" src="https://lencar.es/wp-content/uploads/2014/12/Red-animated-arrow-down.gif" alt="down arrow"/>
            </div> : ""}
        

              <div ref={props.GeneratedContainerRef} className="result">
    
              </div>
        </div>
    )
}
