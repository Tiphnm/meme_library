import React, { Key } from 'react'
//import {newMeme} from  "../../typescript/types"
import MemeButton from "./MemeButton"
import axios from "axios"
import dotenv from "dotenv"
import './meme.css';
dotenv.config()

const apiURL = process.env.REACT_APP_API_URL+"/deletememe"||"http://localhost:4000/deletememe"    

type newMeme = {
    data: {
        id: string,
        name: string,
        url: string,
    }
}

export default function Meme({data}: newMeme) {
     function hello() {
         alert("hello")
     }

 /* Function to delete a meme */
async function Handledelete(name: any) {
        console.log(apiURL)
        
    await axios.delete(apiURL, {
            headers: {
              Authorization: "XSXSXSXSXS"
            },
            data: {
              source: data
            }
          });
    }

    return (
            <div className="container-main">
                    <div className="container-meme">
                    <img className= "meme" src={data.url}></img>
                        <div className="container-comment">
                            
                         <MemeButton symbol="fa-thumbs-up" action={ hello} />

                         <MemeButton symbol="fa-thumbs-down" action={ hello}/>
                         { /* console.log("FROM MEME.tsx MY DATA IS " + data.name) */ }

                         <MemeButton symbol="fa-trash-alt" action={ () => Handledelete(data.url) }/>

                        </div>
                    </div>
                </div>
    )
}
