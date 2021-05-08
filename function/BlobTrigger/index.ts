import { AzureFunction, Context } from "@azure/functions"
import { uuid } from "uuidv4";
import { config } from "dotenv"
import mongoose = require("mongoose");

config()

const blobTrigger: AzureFunction = async function (context: Context, myBlob: any): Promise<void> {
    
    const collection = "_memes" 
    
    await mongoose.connect(process.env.COSMOURI, {useNewUrlParser: true, useUnifiedTopology: true});
    
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    
    db.once('open', function() {
    // we're connected!
    context.log("Connected to the Database")
    });

    context.log("Blob trigger function processed blob \n Name:", context.bindingData.name, "\n Blob Size:", myBlob.length, "Bytes");
    //this is my test

    const memeSchema = new mongoose.Schema({
        _id: String,
        name: String,
        description: String,
        url: String
    })

    const Meme = mongoose.model(collection, memeSchema)

    const mySuperNewMeme = new Meme ({
        _id: uuid(),
        name: context.bindingData.name,
        description: context.bindingData.metadata,
        url: context.bindingData.uri
      })

      // Save 
    
    await mySuperNewMeme.save( (err, blob ) => {
        if (err) return context.log(err);
            context.log(blob)
            
            return (context.res = {
                status: 200,
                body: "Initialization successful",
              });
      
    })

};

export default blobTrigger;