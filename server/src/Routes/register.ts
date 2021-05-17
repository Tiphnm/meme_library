import {connect, display_users, register_user } from "../database/db"
import express, {Request, Response} from "express"
import { User } from '../types'


export default async function registerRouter(req: Request , res: Response ) {

    if (req.body.credentials) {
      console.log("API CREDENTIALS " + req.body.credentials )
     
      // Object Deconstruction of credentials 
      const { username, password } = req.body.credentials;

      try {

        // Function to register an user in db.ts
        const registrationResult =  await register_user(username, password)

        console.log("RESULT IS " + registrationResult)

        return res.status(201).send('User created');

      } catch (err) {

        console.log("CATCH AN ERROR:"+  err)

      }

    }
  return res.status(400).send("There was an error creating your user, check out your data")
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