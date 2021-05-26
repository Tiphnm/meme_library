import React, {useEffect, useState} from 'react'
import {newMeme} from "../../typescript/types"
import MemeButton from "./MemeButton"
import axios from "axios"
import dotenv from "dotenv"
import './meme.css';


/* Env vars */ 
dotenv.config()
const noenv: string = "CONFIGURE YOUR ENV VARS"
const environment = process.env.NODE_ENV || noenv
const api_dev = process.env.REACT_APP_API_DEV || noenv
const api_prod ="https://memetecapi.azurewebsites.net/"

/* If the ENV environment is active then our api is in Localhost */ 
let api_url: string 
environment == "development"? (api_url = api_dev) : (api_url = api_prod)


export default function Meme({data}: any){
    const [like, setLike] = useState(0)

   
/*  Function to like a Meme */

function likeiT() {
    setLike(like+1)
 }



    
 /* Function to delete a meme */
async function Handledelete(input: string) {
    console.log(api_url)
    
await axios.delete(api_url+"/deletememe", {
        headers: {
          Authorization: "XSXSXSXSXS"
        }, 
        data: {
          source: data
        }
      });
}
    return (
            <div className="container-meme">
                    <img className="meme" src={data.url}></img>
                        <div className="container-buttons">     
                        <MemeButton symbol="fa-thumbs-up" action={ likeiT} data={like} />
                        <MemeButton symbol="fa-thumbs-down" action={ likeiT} data={data.metadata.dislikes} />
                         { /* console.log("FROM MEME.tsx MY DATA IS " + data.name) */ }
                         <MemeButton symbol="fa-trash-alt" action={ () => Handledelete(data.url) }/>
                    </div>
                </div>
    )
}
