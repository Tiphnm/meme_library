import {connect, display_users, register_user } from "./db"
import getMemes from "./Routes/hot_display"
import * as registerRouter  from './Routes/register';
import express from "express"
import 'dotenv/config'
import bodyParser from "body-parser"
import cors from "cors"



const app = express();
const PORT = 4000;

app.get('/', (req,res) => {
  res.send('Express + TypeScript Server')
});

app.use(cors())

app.post('/login', (req,res) => {
  console.log("User is trying to log")
  res.send('Express + TypeScript Server')
  res.redirect("http://localhost:3000")
});
 

app.get("/users", (req,res) =>  {
 res.send(display_users())
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.post("/register", )

app.get("/memes", getMemes)

app.listen(PORT, () => {
  connect()
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});



