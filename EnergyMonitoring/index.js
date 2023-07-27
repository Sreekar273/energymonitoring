import mongoose from 'mongoose';
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){   
    res.sendFile(__dirname + "/index.html");  // __dirname - gives the path of the current file
    // res.sendFile("/index.html");
});

mongoose.connect("mongodb://0.0.0.0:27017/EnergyMonitoring", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

console.log("Connected");

const energySchema = new mongoose.Schema ({
    name: String,
    username: String,
    password: String,
    email: String,
    address: String,
    created: Date,
    modified: Date
});

const User = mongoose.model("User", energySchema);



// const time = new Date();

app.post("/", function(req, res){

    var inputName = req.body.name;
    var inputUsername = req.body.username;
    var pass = req.body.password;
    var inputEmail = req.body.email;
    var inputAddress = req.body.address;
    // var createdDate;
    // var modifiedDate;

    res.send("Thanks");
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});

const user1 = new User({
    name: inputName,
    username: inputUsername,
    password: pass,
    email: inputEmail,
    address: inputAddress,
    created: new Date(Date.now()).toISOString(),
    modified: new Date(Date.now()).toISOString()
    // created: time.getTime(),
    // modified: time.getTime()
})

user1.save();