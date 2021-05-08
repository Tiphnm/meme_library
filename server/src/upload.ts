


module.exports = async function (context, myBlob) {
    context.log("JavaScript blob trigger function processed blob \n Blob:", context.bindingData.blobTrigger, "\n Blob Size:", myBlob.length, "Bytes");

    context.bindings.outputmeme = myBlob.url
    // The link 
    context.log(context.bindingData.uri)
     //context.log(context.bindingData.properties)*
     // The metadata
     context.log(context.bindingData.metadata)
   //// context.log(myBlob)
   // context.log(myBlob.URL)


   context.response = {
       body: {
           "memes": context.bindingData.uri
       }
   }

};