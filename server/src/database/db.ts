//import * as bcrypt from "bcrypt"
import mongoose, { Mongoose } from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const MONGOURI: string = process.env.MONGOURI
const collection = "db1"
const userCollection = "users"
const uniqueValidator = require('mongoose-unique-validator')
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    fName: { type: String, required: true},
    lName: { type: String, required: true },
    mail: { type: String, required: true, index: true, unique: true },
    pass: { type: String, required: true }

})

userSchema.plugin(uniqueValidator, {message: 'is already taken.'})

export const User =  mongoose.connection.models[userCollection] || mongoose.model(userCollection, userSchema)
/// 
async  function connect() {
    console.log("Connecting")
    mongoose.connect(MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
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
/*
try {
    let data = await User.findOne({username: user});
    if(!data) {
      throw new Error('no document found');
    }
    return data;
} catch (error) {
    return 0;
}
*/

/*  ----------- REGISTER  -------------------- */


/*  ----------- LOGIN -------------------- */ 

async function searchUserQuery(userMail) {
    var promise = await User.findOne({mail: userMail}).exec()
    return promise
}


async function loginUser(email: string, pass: string) { 
    /* 
let data;
interface myUser {
    mail: String,
    password: String
}

const logUser = new User({
    mail: email,
    password: pass
})

let userData = await User.findOne({mail: email}).exec((err,user) => {
    console.log(user)
    return JSON.stringify(user);
    });

    console.log("mydata" + userData)
*/ 

try {
    var promise = await searchUserQuery(email) 
    return promise;

} catch (err) {
    if (err) console.error("User not found")
    return null;
}
}


export {loginUser, connect, display_users} 