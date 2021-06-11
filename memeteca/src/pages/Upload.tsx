import React, { useState } from 'react';
import Path from 'path';
import uploadFileToBlob, { isStorageConfigured } from '../components/azure-storage-blob';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from "react-router-dom"
import './Upload.css'
import Dropzone from "../components/Dropzone"

const storageConfigured = isStorageConfigured();

export default function Upload() {
  
  const [memeTitle, setMemeTitle] = useState();
  const [memeTags, setMemeTags] = useState()

  // all blobs in container
  const [blobList, setBlobList] = useState<string[]>([]);

  // current file to upload into container
  const [fileSelected, setFileSelected] = useState(null);

  // UI/form management
  const [uploading, setUploading] = useState(false);
  const [inputKey, setInputKey] = useState(Math.random().toString(36));

  const onFileChange = (event: any) => {
    // capture file into state
    setFileSelected(event.target.files[0]);
  };

  const onFileUpload = async () => {
    // prepare UI
    setUploading(true);

    // *** UPLOAD TO AZURE STORAGE ***
    const blobsInContainer: string[] = await uploadFileToBlob(fileSelected);

    // prepare UI for results
    setBlobList(blobsInContainer);

    // reset state/form
    setFileSelected(null);
    setUploading(false);
    setInputKey(Math.random().toString(36));
  };

  // display form
  const DisplayForm = () => (
    <div className="upload-box">
      
      <input type="file" onChange={onFileChange} key={inputKey || ''} className="file-selector" name="filebox"/>
      <label htmlFor="filebox"><strong>Choose a file</strong></label>
      <button className="btn-login btn-upload" type="submit" onClick={onFileUpload}>
        Upload!
          </button>
    </div>
  )
  // display file name and image
  // const DisplayImagesFromContainer = () => (
  //   <div className="container-upload">
  //     <ul className="list">
  //       {blobList.map((item) => {
  //         return (
  //           <li key={item}>
  //             <div className="container-item">
  //               {/* {Path.basename(item)} */}
  //               <br />
  //               <img className="img-item" src={item} alt={item} height="200" />
  //             </div>
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   </div>
  // );
  return ( 
    <>
      <div className="container">
          {/* MEME FORM */}
          <div className="container-main">
            <form> 

           
          <h1 className="title-blob">Upload Your meme and enjoy</h1>

          <span className="form-group"> 
          <label htmlFor="name">Title </label>
          <input name="name" type="text" id="name" />
          </span>

          <span className="form-group"> 
          <label htmlFor="tags">Tags </label>
          <input name="tags" type="text" id="tags" />
          </span>


           {storageConfigured && !uploading && DisplayForm()}
           </form>


          </div>

          {storageConfigured && uploading && <div>Uploading</div>}

          {/*storageConfigured && blobList.length > 0 && DisplayImagesFromContainer()*/}
          {!storageConfigured && <div>Storage is not configured.</div>}
        
      </div>
    </>
  );
};
