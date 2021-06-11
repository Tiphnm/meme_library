import React from 'react'


// Interface for Form Component
interface FormInterface {
    isMemeGenerated?: boolean;
    textBottom?: string;
    textTop?: string;
    handleImageChange?: () => void;
    handleImageInputChange?: (event: React.ChangeEvent) => void;
    handleInputChange?: (event: React.ChangeEvent) => void;
    handleMemeGeneration?: () => void;
    handleMemeReset?: () => void;
  }



export default function Form(props: FormInterface) {
    return (
        <div className="create-container">
            <h1>CREATE YOUR MEME</h1>
            <form className="form-create">

                <span className="group-inputs">
                    <label>TOP</label>
                    <input type="text"  placeholder="Text top" value={props.textTop} onChange={props.handleInputChange}/>
                    <label>BOTTOM</label>
                    <input type="text"  placeholder="Text Bottom" value={props.textBottom} onChange={props.handleInputChange}/>
                </span>
            
                <span className="group-btn">
                    <button className="btn-create" type="button">GET RANDOM IMG</button>
                    {/* Local IMG*/}
                    <label className="btn-create" htmlFor="fileInput">LOAD LOCAL IMG</label>
                    <input id="fileInput" name="fileInput" type="file" accept=".jpg, .jpeg, .png" onChange={props.handleImageInputChange} hidden />
                    
                    <button className="btn-create" type="button" >Button</button>
                    <button className="btn-create" type="button">Button</button>
                </span>
                
            </form>
        </div>
    )
}
