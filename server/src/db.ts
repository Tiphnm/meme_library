import 'dotenv/config'
import * as bcrypt from "bcrypt"
import mongoose from "mongoose"
const MONGOURI: string = process.env.MONGOURI
const collection = "db1"

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
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
/*
userSchema.pre( save, function(next) {
    
})*/

async function register_user(getUser,getPass) {
 const newUser = new User({
     username: getUser,
     password: getPass
 })

newUser.save( (err, myUser) => {
    if (err) return console.error(err)
    console.log("New user registered")
})
}
export {connect, display_users, register_user} 