import 'dotenv/config'
const mongoose = require("mongoose")
const MONGOURI: string = process.env.MONGOURI
const collection = "db1"


   const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const User = mongoose.model(collection, userSchema)

/// 
async  function connect() {
 
    mongoose.connect(MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true})
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));


    await db.once('open', function() {
  // we're connected!
        console.log("connected")
    });
    
}

async function display_users(){
    
    User.find((err, res) => {
        if (err) return console.log(err)
        console.log(res)
    })
}

export {connect, display_users} 