import react, {Key} from "react"


/* App js */ 
export type decodedToken = {
    id: string,
    user: string,
    iat: number
  }


export type newMeme = {
    data: {
        id: string,
        name: string,
        url: string,
    }
    
}


