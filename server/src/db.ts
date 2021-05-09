import 'dotenv/config'
import * as bcrypt from "bcrypt"
import mongoose, { Mongoose } from "mongoose"
import { type } from 'os'
const MONGOURI: string = process.env.MONGOURI
const collection = "db1"
const userCollection = "users"

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
})

const User = mongoose.model(userCollection, userSchema)
/// 
async  function connect() {
    console.log("Connecting")
    mongoose.connect(MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true})
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));


    db.once('open', function() {
  // we're connected!
        console.log("connected")
    });
    
}

async function display_users(){  
    User.find((err, res) => {
        if (err) return console.log(err)
        console.log(res)
        return res
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


async function loginUser(user: string, pass: string) {
interface myUser {
    username: String,
    password: String
}
const logUser = new User({
    username: user,
    password: pass
})

try {
    let data = await User.findOne({username: user});
    if(!data) {
      throw new Error('no document found');
    }
    return data;
} catch (error) {
    return 0;
}
}


export {loginUser, connect, display_users, register_user} 