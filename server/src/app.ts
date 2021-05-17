import { connect, display_users, register_user, loginUser} from "./database/db"
/* Import routes */ 
import getMemes from "./Routes/hot_display"
import deleteMemes from "./Routes/deleteMeme"
import registerRouter from './Routes/register';
import loginRoute from './Routes/login';
import {ResultUser} from "./types"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import jwt from "jsonwebtoken"
import { error } from "console";
import { isValidObjectId } from "mongoose";
dotenv.config()

const key_jwt = process.env.SECRET_TOKEN
const PORT = process.env.PORT || 4000;
const app = express();

/* BODY PARSER */ 
app.use(express.json())
app.use(express.urlencoded( {extended: true}))

/* CORS */
app.use(cors())

/* Home Route */ 
app.get('/', (req, res) => {
  res.send('Express + TypeScript Server')
});

/* LOGIN Route */
app.post('/login', loginRoute);


/* REGISTER  Route */ 
app.post("/register", (req, res) => {
  const username = req.body.credentials.username
  const password = req.body.credentials.password
  register_user(username,password)
})

/* GET MEMES route */
app.get("/memes", getMemes)

/* DELETE MEMES Route */
app.delete("/deletememe", deleteMemes)




/*
//route post pour reccuperer les users et passwords et checker
/*
app.post("/login2", (req, res) => {
  const { mail, password } = req.body
  for (let i = 0; i < users.length; i++) {
    let user = users[i]
    if (user.mail == mail) {
      if (user.password == password) {
        const token = jwt.sign({ id: user.id }, key_jwt);
        res.send(token)
      } else {
        res.send("wrong password")
      }
      return
    }

  }
  console.log(mail, password);
  res.send("wrong user")

})
*/
//authentification

const authentification = (req, res, next) => {
  try {
    const { token } = req.query
    var decoded = jwt.verify(token, key_jwt);
    console.log("ok");
    //res.send("token ok")
    next()

  } catch (err) {
    console.log(err);
    res.send("token fail")
  }
}
//route qui redirige vers le profil
app.get("/profile", authentification,(req, res) => {

  console.log("profile")
  res.send("profile")

})

//exemple de route
app.post("/private", authentification,(req, res)=> {
  console.log("private");
  res.send("private")
  
})


/* Get all users */ 
app.get("/users", (req, res) => {
  res.send(display_users())
})





/* Server listening */ 
app.listen(PORT, () => {
  connect()
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});



