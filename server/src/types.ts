export type User = { username: string; password: string };

export interface ResultUser {
    _id: String,
    username: String,
    password: String,
    __v: Number
}

export interface ResultMeme {
    _id: String,
    name: String,
    description: {
        hello: String
    },
    url: String
    __v: Number
}
