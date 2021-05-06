import * as express from "express" 
import mongoose from "mongoose"

/* Create a new mongoose Schema for a meme document*/

const memeSchema = new mongoose.Schema({
    name: { type: String, required: true, index: { unique: true } },
    url: { type: String, required: true }
})

/* Create a mongoose model that connects the Schema with the collection */
const collection = "_memes"
const Meme = mongoose.model(collection, memeSchema)

const All_memes = []


/* Define the route */
export default async function getMemes(req, res) {

    await Meme.find((err, res) => {
        All_memes.push(res)
    })

    res.send(All_memes)
}