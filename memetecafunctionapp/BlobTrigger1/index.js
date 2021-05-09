const mongoose = require("mongoose")

module.exports = async function blobTrigger (context , myBlob ) {
    
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
        name: String,
        description: Object,
        url: String
    })

    const Meme = mongoose.model(collection, memeSchema)

    const mySuperNewMeme = new Meme ({
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