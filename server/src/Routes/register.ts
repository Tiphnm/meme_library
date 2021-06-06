import express, {Request, Response} from "express"
import { User as UserType } from '../types'
import {User as UserModel, connect} from "../database/db"

type payloadType = {
  status: number,
  payload: string
}

export default async function registerRouter(req: Request , res: Response ) {

    if (req.body.credentials) {
    
      console.log("API CREDENTIALS " + JSON.stringify(req.body.credentials))
      
      // Object Deconstruction of credentials 
      const { firstName, lastName, email, password} = req.body.credentials; 

      // Create a new user Object to save 
      const newUser = new UserModel({
        fName:firstName ,
        lName:lastName ,
        mail: email, 
        pass: password
    })

      try {
            // Function to save the new User Object 
            await newUser.save( (err, myUser) => {

            if (err) {
                console.log("DB80" + err)
                return res.status(401).send(err)

            } else {
                console.log(myUser.mail)   
                console.log("New user registered")
                return res.status(201).send('User created');
            }
      })

      } catch (err) {
        console.log("CATCH AN ERROR:"+  err)
      }


    } else {
      // There are not credentials
    return res.status(401).send("Your credentials are empty")
    }
 } 


/*
 async function register_user(getUser,getPass) {
  console.log(getUser, getPass)
  let status = ""

  const newUser = new User({
      username: getUser,
      password: getPass
  })

  try {
       status = await newUser.save( (err, myUser) => {
          if (err) {
              throw new Error(err)
          } else {
              console.log(myUser.username)   
              console.log("New user registered")
          }
          return 0
      })
     
  }  catch (error) {
      console.log("ERROR 2: " + error)
      return 0
  }
  return status 
}
*/

//////////////////////////////////////




/* 

async function register_user(userData) {

  console.log(JSON.stringify(userData))

  const { firstName, lastName, email, password} = userData;

export const newUser = new User({
    fName:firstName ,
    lName:lastName ,
    mail: email, 
    pass: password
})


  try {
       var status = await registerUserQuery(newUser)
       console.log("DB93 " + JSON.stringify(status))

  }  catch (error) {

      console.log("ERROR 2: " + error)   
      return 0

  } 
}

*/ 