import mongoose, { now } from 'mongoose';
import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { ObjectId } from 'mongodb';
import http from 'http';
import cors from 'cors';
import { METHODS } from 'http';
import { Socket } from 'socket.io';
import moment from 'moment';
moment().format();
// import Data from 'home.js'

// var express = require('express');
// var mongoose = require('mongoose');
// var bodyParser = require('body-parser');
// var path = require('path');
// var url = require('url');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Final

app.use(express.json());

// app.set('view engine', 'ejs');

app.use(bodyParser.text());

app.use(cors());

app.options('*', cors()); // include before other routes


// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Max-Age", 3600);
    next();
});

// if ($http_origin ~* "^http://www.example.com:8080$") {
//             add_header Access-Control-Allow-Origin "$http_origin";
//             add_header Access-Control-Allow-Methods "OPTIONS, POST, GET";
//             add_header Access-Control-Max-Age "3600";
//             add_header Access-Control-Allow-Credentials "true";
//             add_header Access-Control-Allow-Headers "Content-Type";
//             set $test  "A";
// }

// Headers(Access-Control-Allow-Origin, "http:localhost:4200", METHODS="GET,PUT,POST,DELETE");



// app.use(express.static('emon'));

mongoose.connect("mongodb://0.0.0.0:27017/EnergyMonitoring", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const energySchema = new mongoose.Schema ({
    username: String,
    email: String,
    password: String,
    created: String,
    modified: String
});

const User = mongoose.model("User", energySchema);

// app.get("/", function (req, res) {
//     res.render("list",{ details: null })
// });

app.get("/", function(req, res){
    res.sendFile(__dirname + "/first.html");
});

// app.get("/register", function(req, res){
//     res.sendFile(__dirname + "/register.html");
//     // res.send('Hello');
// });

// app.post('/register' , async function(req,res){
//     // console.log(req.body);
//     // res.status(200).send({"message": "Data recieved"});
//     res.sendFile(__dirname + "/register.html");
// });

app.post("/register", async function(req,res){
    console.log(req.body);
   // res.send(req.headers);
//    res.send(req.params);
    // res.send(req.body);
    // res.send(req.user);
    if (!req.body.username) {
        // res.status(400).send({ message: "Content can not be empty!" });
        res.send(false);
        // res.status(200);
        return;
    }
    else{
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var cpass = req.body.cpass;

        const user1 = await User.findOne({ username: req.body.username });

        if(password == cpass && user1 == null){
            const user2 = new User({
                username: username,
                email: email,
                password: password,
                created: new Date(Date.now()),
                modified: new Date(Date.now())
            });
        
            user2.save();
            res.send(true);
        }
        
        res.status(200);
        
    }
    // exit('1');
    // res.send(res.body);
   
});

// app.post("/register", async function(req, res){

//     var username = req.body.username;
//     var email = req.body.email;
//     var password = req.body.password;
//     var cpass = req.body.cpass;

//     // res.send(User.find({"username": username}).fetch());

//     // if(password == cpass && User.find({"username": username}).fetch() == null){

//     const user1 = await User.findOne({ username: req.body.username });
    

//     if(password == cpass && user1 == null){

//         res.sendFile(__dirname + "/reg.html");

//         // bcrypt
//         //     .hash(password, 10)
//         //     .then(hash => {
//         //         // console.log('Hash ', hash);
//         //         password = hash;
//         //     });

//         const user1 = new User({
//             username: username,
//             email: email,
//             password: password,
//             created: new Date(Date.now()),
//             modified: new Date(Date.now())
//         });

//         user1.save();
//     }

//     // alert("Password and Confirm Password not same. Try again");

//     res.sendFile(__dirname + "/register.html");

// });

// app.get("/login", function(req, res){
//     // let loginObj = {
//     //     username: req.body.username,
//     //     password: req.body.password,
//     // };
//     res.sendFile(__dirname + "/login.html");
// });

// get username and password from the databse and conpare it with the input username password

app.post("/login", async function(req,res){

    // let loginObj = {
    //     username: req.body.username,
    //     password: req.body.password,
    // };
    console.log(req.body);

    var username = req.body.username;
    var password = req.body.password;

    // console.log(username);

    const user = await User.findOne({ username: req.body.username });

    console.log(user);

    if (user != null) {
        //check if password matches
        const result = req.body.password === user.password;
        console.log(result);
        // bcrypt
        //     .compare(password, hash)
        //     .then(result = true)
        if (result) {
        //   res.render("list");
            // res.sendFile(__dirname + "/home.html");
            console.log(result);
            res.status(200);
            res.send(true);
        } else {
        //   res.sendStatus(400).json({ error: "password doesn't match" });
          res.send(false);
        // res.redirect('/login');
            // res.send("Password incorrect. Please try again");
        }
    } 
    else {
        res.send(false);
        // res.status(400).json({ error: "User doesn't exist" });
        // res.send("Username does not exist. Please try again or Register");
    }

});

app.get("/getdetails", function (req, res) {   
    User.find().then (function (allDetails) {
        res.render("list", { details: allDetails })
    })
});

// app.get("/getdata",  function (req, res){
//     User.find({});
// });

app.get("/userjson", function(req,res){
    User.find().then(function(postdata){
        res.send(postdata);
    });
});

app.get("/energyjson", function(req,res){
    Data.find().then(function(postdata){
        res.send(postdata);
    });
});

app.get("/meterjson", function(req,res){
    Meter.find().then(function(postdata){
        res.send(postdata);
    });
});

// GETTING DATA

const energyData = new mongoose.Schema ({
    meterID: {type: mongoose.Schema.Types.ObjectId, ref: "Meter"},
    energy_kwh: Number,
    voltage: Number,
    current: Number,
    pf: Number,
    freq: Number,
    createdDate: Date,
    date: String,
    dd: String,
    createdDay: String,
    createdMonth: String,
    createdYear: String,
    created: String,
    time: String,
    tm_stamp: Number
});

const meterData = new mongoose.Schema ({
    meter_name: String,
    model_num: String,
    location: String,
    load: String,
    zone_name: String
});

const Data = mongoose.model("Data", energyData);
const Meter = mongoose.model("Meter", meterData);

const meter1 = new Meter({
    // model_id: energy1.meterID,
    meter_name: "QWS",
    model_num: "3",
    location: "Maintenance Room",
    load: "3D printer",
    zone_name: "West"
});
const timenow = new Date();
var year = timenow.getFullYear();
var month = timenow.getMonth()+1;
var dt = timenow.getDate();
var dd = (year+'-' + month + '-'+dt)
if (dt < 10) {
  dt = '0' + dt;
}
if (month < 10) {
  month = '0' + month;
}

const energy1 = new Data({
    // meterID: "198",
    meterID: meter1._id,
    // meterID: Meter.find({Meter: ObjectId}).populate(),
    energy_kwh: Math.floor((Math.random() * 300) + 100),
    voltage: 224,
    current: 20,
    pf: 0.7,
    freq: 100,
    createdDate: timenow,
    date: timenow.toISOString(),
    dd: dd,
    createdDay: timenow.getDate(),
    createdMonth: timenow.getMonth()+1,
    createdYear: timenow.getFullYear(),
    created: `${timenow.getHours()}:${timenow.getMinutes()}:${timenow.getSeconds()}`,
    time: "23:15",
    tm_stamp: Date.parse(timenow)/1000
});

// timenow.getDay();
// timenow.getMonth();
// timenow.getFullYear();

const energy2 = await Data.findOne({ energy_kwh: 276 });
const meter2 = await Meter.findOne({ _id: energy2.meterID });
console.log(meter2.model_num);

// energy1.save();
// meter1.save();

// const sum = Data.aggregate([
//     {
//         $group:{
//             _id: {createdDate: {$concat : ["$createdYear", "-", "$createdMonth", "-", "$createdDay"]}},
//             totalEnergy: {$sum: "$energy_kwh"}
//         }
//         // $group: {
//         //     _id: { $dateToString: { format: "%d/%m/%Y", date: "$createdDate" },
//         //     sum: { $sum: "$energy_kwh" },
//         //   }},
//         // $project: {
//         //     date: "$_id",
//         //     sum: 1,
//         //     _id: 0,
//         // }
//     }
// ])
// .then(result => {
//     console.log(result);
// })

function parseDate(input) {
    var str= input.split('-');
    return str; 
}

// const d = await (Data.find({dd: '2023-7-18'})
//                     .sum({total: "$energy_kwh"}));
// console.log(d);

let results = await Data.aggregate([
    {$match : {dd: '2023-7-18'}},
    {$group: {_id : null, allamount: {$sum: "$energy_kwh"}}}
    ]);
let allamount = results[0].allamount;
console.log(results[0].allamount);

const inputdate = parseDate('2023-6-18');
    // console.log(inputdate);
    const sum = Data.aggregate([
        {
            $group:{
                // _id: {createdDate: {$concat : ["$createdYear", "-", "$createdMonth", "-", "$createdDay"]}},
                // _id: [{createdYear: inputdate[0]},{createdYear: inputdate[1]},{createdYear: inputdate[2]}],
                _id: {createdDate: "$dd"},
                // $and: [
                //     {createdYear: inputdate[0], createdMonth: inputdate[1], createdDay: inputdate[2]}
                // ],
                totalEnergy: {$sum: "$energy_kwh"}
            }
        }

        // moment(craetedDate).format("MM/DD/YYYY");

    ])
    .then(result => {
        console.log(result);
        // console.log(sum[0].$group.totalEnergy);
    })

    // {$gte: req.params.sdate, $lte: req.params.edate}
    // {
    //     "lastLogin":{
    //     //   $gte: ISODate("2022-08-01T00:00:00.000Z"),
    //     //   $lte: ISODate("2022-08-31T00:00:00.000Z")
    //     }
    //   }

app.post('/energyjson', async function(req, res){
    console.log(req.body);

    var meter = await Meter.find({$and: [{meter_name : req.body.meter }, {model_num: req.body.model}]});
    var zone = await Meter.find({zone_name : req.body.zone_name });
    let zoneID = [];
    zone.forEach((ele)=>{
        zoneID.push(ele._id);
    })
    var energ = await Data.find({meterID: meter.id});
    if(req.body.zoneDisplay){
        console.log(zone);
        console.log(zoneID);
    }
    else{
        console.log(meter);
    }

    // if(req.body.sdate == null && req.body.currmonth == null && req.body.curryear == null && req.body.date == null){
    //     var energy = [];
        
    //     // console.log(newdate);
    //     // console.log(meter.id);
    //     let results = await Data.aggregate([
    //         {$match :  {meterID: meter[0]._id}},
    //         {$group: {_id : "$time", allamount: {$sum: "$energy_kwh"}}}
    //         ]);
    //     // results.sort(results.$time);
    //     console.log(results);
    //     results.forEach((ele) => {
    //         energy.push({x: ele._id, y: ele.allamount});
    //     });
    //     energy.sort(({ x: a }, {x: b }) => a > b ? 1 : a < b ? -1 : 0);
    //     console.log(energy);
    //     res.send(energy);
    // }

    if(req.body.date != null){
        var dd = req.body.sdate;
        var id2 = new ObjectId('64b50b381153f6ec98818f40');
        console.log(meter[0]._id);
        console.log(id2);
        var energy = [];
        let newdate = moment.parseZone(dd, "YYYY-M-D").toISOString();
        // console.log(newdate);
        console.log(req.body.zoneDisplay);
        let results = [];
        if(!req.body.zoneDisplay){
            results = await Data.aggregate([
                {$match : {$and:[{date: newdate}, {meterID: meter[0]._id}]}},
                {$group: {_id : "$time", allamount: {$sum: "$energy_kwh"}}}
                ]);
        }
        else{
            results = await Data.aggregate([
                {$match : {$and:[{date: newdate}, {zone_name: zone[0].zone_name}]}},
                {$group: {_id : "$time", allamount: {$sum: "$energy_kwh"}}}
                ]);
        }
        // let results = await Data.aggregate([
        //     {$match : {$and:[{date: newdate}, {meterID: meter[0]._id}]}},
        //     {$group: {_id : "$time", allamount: {$sum: "$energy_kwh"}}}
        //     ]);
        // results.sort(results.$time);
        console.log(results);
        results.forEach((ele) => {
            energy.push({x: ele._id, y: ele.allamount});
        });
        // energy.sort(energy.x);
        // energy.sort((a, b) => b.x - a.x);
        energy.sort(({ x: a }, {x: b }) => a > b ? 1 : a < b ? -1 : 0);
        // energy.push({x: results[0]._id, y: results[0].allamount});
        console.log(energy);
        res.send(energy);
    }

    if(req.body.sdate != null){
        let dd1 = req.body.sdate;
        let dd2 = req.body.edate;
        var d;
        console.log(meter[0]._id);
        var energy = [];
        let newdate = moment.parseZone(dd1, "YYYY-M-D").toISOString();
        let newdate2 = moment.parseZone(dd2, "YYYY-M-D").toISOString();
        let dd1new = Date.parse(dd1)/1000;
        let dd2new = Date.parse(dd2)/1000;
        // console.log(typeof dd1new );
        // console.log(typeof dd2new );
        // console.log( dd1new );
        // console.log( dd2new );
        // console.log(typeof dd2new );

        let results2 = [];
        if(!req.body.zoneDisplay){
            results2 = await Data.find({meterID: meter[0]._id,tm_stamp:{$gte:dd1new, $lte:dd2new}});
        }
        else{
            results2 = await Data.find({zone_name: zone.zone_name,tm_stamp:{$gte:dd1new, $lte:dd2new}});
        }
        console.log(results2,"resul1t2222");
        var resultdate = [];
        var ddindex = 0;
        results2.forEach((ele)=>{
            var found = resultdate.some(el => el.x === ele.dd);
            // console.log(found);
            if(found){
                // console.log(he);
                var index = resultdate.findIndex(object => {
                    return object.x === ele.dd;
                });
                // ddindex = resultdate.indexOf(ele.dd);
                resultdate[index].y += ele.energy_kwh; 
            }
            else if (ele.dd == undefined){
                var foundnull = resultdate.some(el => el.x === 'null');
                if(foundnull){
                    // console.log(he);
                    var indexnull = resultdate.findIndex(object => {
                        return object.x === 'null';
                    });
                    // ddindex = resultdate.indexOf(ele.dd);
                    resultdate[indexnull].y += ele.energy_kwh; 
                }
                else{
                    resultdate.push({x: "null", y: ele.energy_kwh});
                }
            }
            else{
                resultdate.push({x: ele.dd, y: ele.energy_kwh});
            }
        });
        console.log(resultdate);
        // let results = await Data.aggregate([
        //     {$match : {$and:[{date: {$gte: (newdate), $lte: (newdate2)}}, {meterID: meter[0]._id}]}},
        //     {$group: {_id : "$dd", allamount: {$sum: "$energy_kwh"}}}
        //     ]);
        // console.log(results);
        // results.forEach((ele) => {
        //     energy.push({x: ele._id, y: ele.allamount});
        // });
        // energy.sort(({ x: a }, {x: b }) => a > b ? 1 : a < b ? -1 : 0);
        // // energy.push({x: results[0]._id, y: results[0].allamount});
        // console.log(energy);
        // // res.send(energy);
        resultdate.sort(({ x: a }, {x: b }) => a > b ? 1 : a < b ? -1 : 0);
        res.send(resultdate);
    }


    // try-> if(req.body.sdate == null && req.body.currmonth != null){then do the following}

    // get month as input for daily view & year as input for monthly view & show every year data when yearly is selected
    // send the current month and year from angular to nodejs (using Date().something)
    if(req.body.sdate == null && req.body.currmonth != null){
        console.log(meter[0]._id);
        var newmonth = 7;
        var newyear = 2023;
        var energymonth = [];
        var dd1month = `${newyear}-${newmonth}-1`;
        var dd2month = `${newyear}-${newmonth+1}-1`;
        // console.log(dd2month);
        // let newmonthdate = moment.parseZone(dd1month, "YYYY-M-D").toISOString();
        // var newmonthdate2 = moment.parseZone(dd2month, "YYYY-M-D").toISOString();
        // // console.log(newmonthdate2);
        // let resultsmonth = await Data.aggregate([
        //     {$match : {$and:[{date: {$gte: (newmonthdate), $lte: (newmonthdate2)}}, {meterID: meter[0]._id}]}},
        //     {$group: {_id : "$dd", allamount: {$sum: "$energy_kwh"}}}
        //     ]);
        // console.log(resultsmonth);
        // resultsmonth.forEach((ele) => {
        //     energymonth.push({x: ele._id, y: ele.allamount});
        // });
        // energymonth.sort(({ x: a }, {x: b }) => a > b ? 1 : a < b ? -1 : 0);
        // console.log(energymonth);

        let dd1new = Date.parse(dd1month)/1000;
        let dd2new = Date.parse(dd2month)/1000;
        // console.log(typeof dd1new );
        // console.log(typeof dd2new );
        // console.log( dd1new );
        // console.log( dd2new );
        // console.log(typeof dd2new );
        console.log(zoneID, 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
        let results2 = []
        if(!req.body.zoneDisplay){
            results2 = await Data.find({meterID: meter[0]._id,tm_stamp:{$gte:dd1new, $lte:dd2new}});
        }
        else{
            
            results2 = await Data.find({meterID: zoneID[0],tm_stamp:{$gte:dd1new, $lte:dd2new}});

        }
        console.log(results2,"resul1t2222");
        var resultdate = [];
        var ddindex = 0;
        results2.forEach((ele)=>{
            var found = resultdate.some(el => el.x === ele.dd);
            // console.log(found);
            if(found){
                // console.log(he);
                var index = resultdate.findIndex(object => {
                    return object.x === ele.dd;
                });
                // ddindex = resultdate.indexOf(ele.dd);
                resultdate[index].y += ele.energy_kwh; 
            }
            else if (ele.dd == undefined){
                var foundnull = resultdate.some(el => el.x === 'null');
                if(foundnull){
                    // console.log(he);
                    var indexnull = resultdate.findIndex(object => {
                        return object.x === 'null';
                    });
                    // ddindex = resultdate.indexOf(ele.dd);
                    resultdate[indexnull].y += ele.energy_kwh; 
                }
                else{
                    resultdate.push({x: "null", y: ele.energy_kwh});
                }
            }
            else{
                resultdate.push({x: ele.dd, y: ele.energy_kwh});
            }
        });
        console.log(resultdate);
        // res.send(energymonth);
        resultdate.sort(({ x: a }, {x: b }) => a > b ? 1 : a < b ? -1 : 0);
        res.send(resultdate);
    }
    


    // send the current year from angular to nodejs (using Date().something)
    if(req.body.sdate == null && req.body.currmonth == null && req.body.curryear != null ){
        var selectedyear = req.body.curryear;
        var yearlyEnergy = [];
        var dd1year = `${selectedyear}-1-1`;
        var dd2year = `${selectedyear+1}-1-1`;
        let startOfYearDate = moment.parseZone(dd1year,"YYYY-M-D").toISOString();
        let endOfYearDate = moment.parseZone(dd2year,"YYYY-M-D").toISOString();
        // let resultsyear = await Data.aggregate([
        //     {$match : {$and:[{date: {$gte: (startOfYearDate), $lte: (endOfYearDate)}}, {meterID: meter[0]._id}]}},
        //     {$group: {_id : "$createdMonth", allamount: {$sum: "$energy_kwh"}}}
        //     ]);
        // console.log(resultsyear);
        // resultsyear.forEach((ele) => {
        //     yearlyEnergy.push({x: ele._id, y: ele.allamount});
        // });
        // yearlyEnergy.sort(({ x: a }, {x: b }) => a > b ? 1 : a < b ? -1 : 0);
        // console.log(yearlyEnergy);

        let dd1new = Date.parse(dd1year)/1000;
        let dd2new = Date.parse(dd2year)/1000;
        // console.log(typeof dd1new );
        // console.log(typeof dd2new );
        // console.log( dd1new );
        // console.log( dd2new );
        // console.log(typeof dd2new );
        let results2 = await Data.find({meterID: meter[0]._id,tm_stamp:{$gte:dd1new, $lte:dd2new}});
        console.log(results2,"resul1t2222");
        var resultdate = [];
        var ddindex = 0;
        results2.forEach((ele)=>{
            var found = resultdate.some(el => el.x === ele.createdMonth);
            // console.log(found);
            if(found){
                // console.log(he);
                var index = resultdate.findIndex(object => {
                    return object.x === ele.createdMonth;
                });
                // ddindex = resultdate.indexOf(ele.dd);
                resultdate[index].y += ele.energy_kwh; 
            }
            else if (ele.dd == undefined){
                var foundnull = resultdate.some(el => el.x === 'null');
                if(foundnull){
                    // console.log(he);
                    var indexnull = resultdate.findIndex(object => {
                        return object.x === 'null';
                    });
                    // ddindex = resultdate.indexOf(ele.dd);
                    resultdate[indexnull].y += ele.energy_kwh; 
                }
                else{
                    resultdate.push({x: "null", y: ele.energy_kwh});
                }
            }
            else{
                resultdate.push({x: ele.createdMonth, y: ele.energy_kwh});
            }
        });
        console.log(resultdate);
        resultdate.sort(({ x: a }, {x: b }) => a > b ? 1 : a < b ? -1 : 0);
        res.send(resultdate);
        // res.send(yearlyEnergy);
    }


    // var total = [];
    // var year = new Date();
    // var presentyear = year.getFullYear();
    // // console.log(presentyear);
    // let totalresults = await Data.aggregate([
    //     {$match : {createdYear: {$lte: (presentyear)}}},
    //     {$group: {_id : "$createdYear", allamount: {$sum: "$energy_kwh"}}}
    //     ]);
    // console.log(totalresults);
    // totalresults.forEach((ele) => {
    //     total.push({x: ele._id, y: ele.allamount});
    // });
    // console.log(total);
});

app.get("/energydata", function (req, res) {   
    Data.find().then (function (energyDetails) {
        res.render("energy", { details: energyDetails })
    });
});

app.get("/meterdata", function (req, res) {   
    Meter.find().then (function (allData) {
        res.render("meter", { data: allData })
    });
});

const server = app.listen(5000, function(){
    console.log("Server is running on port 5000");
});

// const io = new Socket(server);

// io.on('connection', (socket)=>{
//     console.log(`new connection id: ${socket.id}`);
// });