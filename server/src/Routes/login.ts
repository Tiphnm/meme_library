import {loginUser} from "../database/db"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const key_jwt = process.env.SECRET_TOKEN

export default async function loginRoute(req,res) {
  
  function isValid(input:string){
    if (input.length > 3) return true 
  }

  const username = req.body.credentials.username
  const password = req.body.credentials.password
  let result 
  isValid(username) && isValid(password)? result = await loginUser(username,password) : 0


  console.log("result is:" + result)

  function validateUser(result) {
    if (result === 0) {
      console.log("User doesn't exist")
      res.status(401).send('no user exists in db to update');
      return 0
    }

    if (password === result.password) {
      /*  Login Success */
      console.log("Login Success")
      const token = jwt.sign({ id: result._id, user: result.username }, key_jwt);
      res.send(token)
      console.log(token)
      return 1 

    } else {
      console.log("Password not matching ")
      res.status(401).send('Password incorrect');
      return 0
    }
  }

  validateUser(result)

}