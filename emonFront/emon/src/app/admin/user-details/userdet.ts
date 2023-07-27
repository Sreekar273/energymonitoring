export class UserData{
    constructor(
        public username: String,
        public email :String,
        public password : String,
        public created: Date,
        public modified: Date,
    ){}
}

export interface UserDet{
    username: String,
    email :String,
    password : String,
    created: Date,
    modified: Date,
}