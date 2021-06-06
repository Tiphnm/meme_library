import React, {useState} from 'react'
import {newMeme} from "../typescript/types"
import MemeButton from "./MemeButton"
import axios from "axios"
import getApi from '../typescript/GetApi'
import './meme.css';

export default function Meme({data, canDelete , key}: any){
    const [like, setLike] = useState(0)
    console.log(canDelete)

   
/*  Function to like a Meme */

function likeiT() {
    setLike(like+1)
 }


 /* Function to delete a meme */
async function Handledelete(input: string) {
await axios.delete(getApi()+"/deletememe", {
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
                        <MemeButton symbol="fa-thumbs-up" action={ likeiT} data={like} visible={true} />
                        <MemeButton symbol="fa-thumbs-down" action={ likeiT} data={data.metadata.dislikes} visible={true} />
                         { /* console.log("FROM MEME.tsx MY DATA IS " + data.name) */ }
                         <MemeButton symbol="fa-trash-alt" action={ () => Handledelete(data.url) } visible={canDelete} />
                    </div>
                </div>
    )
}
