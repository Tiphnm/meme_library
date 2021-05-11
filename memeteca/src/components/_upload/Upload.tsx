import React, { useState } from 'react';
import Path from 'path';
import troll from '../../assets/img/troll.png'
import uploadFileToBlob, { isStorageConfigured } from '../azure-storage-blob';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from "react-router-dom"
import './Upload.css'

const storageConfigured = isStorageConfigured();

const Upload = (props: any, ...rest: any): JSX.Element => {


const isLogged = false 


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
    <div>
      <input type="file" onChange={onFileChange} key={inputKey || ''} />
      <button className="button-upload" type="submit" onClick={onFileUpload}>
        Upload!
          </button>
    </div>
  )
  // display file name and image
  const DisplayImagesFromContainer = () => (
    <div className="container-upload">
      <ul className="list">
        {blobList.map((item) => {
          return (
            <li key={item}>
              <div className="container-item">
                {/* {Path.basename(item)} */}
                <br />
                <img className="img-item" src={item} alt={item} height="200" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
  return ( 
    <>
      <div className="container">
        <div className="container-aside">
          <h1>Popular</h1>
          <ul>
            <li>
              <a>
                <img src={troll} alt="meme-img" /><span className="thumb-meme">My meme</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="container-main">
          {/* USER IS LOGGED IN ? */}

          <h1 className="title-blob">Upload Your meme and enjoy</h1>
          {storageConfigured && !uploading && DisplayForm()}
          {storageConfigured && uploading && <div>Uploading</div>}
          <hr />
          {storageConfigured && blobList.length > 0 && DisplayImagesFromContainer()}
          {!storageConfigured && <div>Storage is not configured.</div>}
          <div className="container-comment">
            <button className="like_button">
              <i className="far fa-thumbs-up fa-3x">
              </i>
            </button>
            <button className="like_button">
              <i className="far fa-thumbs-down fa-3x">
              </i>
            </button>
            <span>comments -</span>
            <span className="span2">313 points</span>
          </div>
        </div>
        <div className="container-last"></div>
      </div>
    </>
  );
};

export default Upload;