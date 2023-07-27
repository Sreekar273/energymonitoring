export class User{
    constructor(
      public username: String,
      public email :String,
      public password : String,
      public cpass: String
    ){}
}

export interface RegUser {
    username: string;
    email: string;
    password: string;
    cpass: string;
}