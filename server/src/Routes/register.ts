import {connect, display_users, register_user } from "../db"
import * as express from "express"
import { User } from '../types'


export default function registerRouter(req ,res ) {
        console.log(req)
        const { username, password }: User = req.body;
        if (username.length <= 2 || password.length <= 2 ) {
          return res.status(400).send('Bad username or password');
        }
        console.log({ username, password });
        register_user(username, password)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        res.status(201).send('User created');
 } 