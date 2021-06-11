import react, {Key} from "react"


/* App js */ 
export type decodedToken = {
    id: string,
    user: string,
    iat: number
  }


export type newMeme = {
    _id: number,
    data: {
        id: string,
        name: string,
        url: string,
        metadata:  {
            likes: number,
            dislikes: number,
            likeBy: {},
            dislikeBy: {},
        }
        date: Date
    }
    
}

/* Meme generator */ 

export type template = {
    url: string
}

