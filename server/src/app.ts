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
app.post("/register", registerRouter)


/* GET MEMES route */
app.get("/memes", getMemes)

/* DELETE MEMES Route */
app.delete("/deletememe", deleteMemes)



/* Optional Blocks  
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

*/

/* Get all users: CURRENTLY NOT WORKING */ 
app.get("/users", (req, res) => {
  res.send(display_users())
})


/* Server listening */ 
app.listen(PORT, () => {
  connect()
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});



