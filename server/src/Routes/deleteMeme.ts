import {ResultMeme} from "../types"
import  mongoose = require("mongoose");
import { BlobServiceClient,ContainerClient, StorageSharedKeyCredential } from "@azure/storage-blob"

require("dotenv").config()

const collection = "_memes"

/* Route  to delete the meme */ 

export default async function deleteMemes(req ,res ) {
    console.log(req.body.source)
    if  (req.headers.authorization=="XSXSXSXSXS") {
        console.log("Delete the meme")
        const memeUrl: string = req.body.source.url
        const memeName: string = req.body.source.name
        await deleteMemeFromDb(memeUrl)
        await deleteMemeFromBlobStorage(memeName)
      } else {
        //res.status(403).end()
        console.log("UNAUTHORIZED")
      }
      return;
 } 

  /* Function to delete the meme from the Database */ 

 async function deleteMemeFromDb(memeUrl: String): Promise<string> {
    const memeSchema = new mongoose.Schema({
        _id: String,
        name: String,
        description: Object,
        url: String
    })
    const Meme = mongoose.connection.models[collection] || mongoose.model(collection, memeSchema)
    const db = mongoose.connection;
    try {

        await mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true});
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
        console.log("Connected to the Database")
        });

         Meme.deleteOne({url: memeUrl}, (err) => {
            console.log(err)
        });

        return "Meme has been deleted"
    } catch (error) {
        console.error(error)
    }
 }

 /* Delete the meme from the blob Storage */ 
 async function deleteMemeFromBlobStorage(memeName: string): Promise<void>{
   
    async function streamToString(readableStream) {
        return new Promise((resolve, reject) => {
          const chunks = [];
          readableStream.on("data", (data) => {
            chunks.push(data.toString());
          });
          readableStream.on("end", () => {
            resolve(chunks.join(""));
          });
          readableStream.on("error", reject);
        });
      }
    
    async function main() {
        const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
        const blobServiceClient = await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
        const containerClient = await blobServiceClient.getContainerClient("memes");
        console.log(await containerClient.deleteBlob(memeName))
       /* const blockBlobClient = containerClient.getBlockBlobClient(memeName)
        const downloadBlockBlobResponse = await blockBlobClient.download(0);
        console.log(await streamToString(downloadBlockBlobResponse.readableStreamBody));
        const blobDeleteResponse = blockBlobClient.delete(); */
       // console.log((await blobDeleteResponse).clientRequestId);
    }
    
    main().catch((err) => {
        console.error("Error running sample:", err.message);
      });
 }

 //containerClient.deleteBlob('blob-name')