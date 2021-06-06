import express, {Request, Response} from 'express';
import {loginUser} from "../database/db"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const key_jwt = process.env.SECRET_TOKEN

interface Credentials {
    username: string,
    password: string
}


export default async function loginRoute(req: Request ,res: Response) {

    if (req.body.credentials) {
        // If credentials are passed
        console.log("credentials received")
        console.log("API CREDENTIALS " + JSON.stringify(req.body.credentials))
        // Now check if those credentials are not unEmpty values
        if (req.body.credentials.username && req.body.credentials.password) {
        
        const {username, password}: Credentials = req.body.credentials

           try {
           
            const fetchCredentials = await loginUser(username,password)
            
            /* Evaluate the fetch request to the Database */ 

            if (!fetchCredentials) {
                // Not user Found
                console.log("Not user found")
                return res.status(401).send('User not found');

            } else if (fetchCredentials) {
             // User Found 

                 if (fetchCredentials.pass == password) {
                     // User ok + pass ok 

                     console.log("Login Success")
                     console.log(JSON.stringify(fetchCredentials))
                     const token = jwt.sign({ id: fetchCredentials._id, user: fetchCredentials.fName }, key_jwt);
                     console.log(token)
                     return res.status(200).send(token)

                 }
                // User ok but password incorrect
                console.log("Password not matching ")
                return res.status(401).send("Incorrect password")
                
            }

           } catch (error) {
                console.log("error on catching ")
               console.error(" ERROR "+error)
           }
 
        }
    // There are credentials but they are not in a valid format
        return res.status(401).send("Your credentials format are not valid")
 
    }
    // There are not credentials
    return res.status(401).send("Your credentials are empty")

}
