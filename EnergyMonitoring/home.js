import mongoose from 'mongoose';
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://0.0.0.0:27017/EnergyMonitoring", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const energyData = new mongoose.Schema ({
    meterID: String,
    energy_kwh: Number,
    voltage: Number,
    current: Number,
    pf: Number,
    freq: Number
});

const meterData = new mongoose.Schema ({
    meter_name: String,
    model_num: String
});

const Data = mongoose.model("Data", energyData);
const Meter = mongoose.model("Meter", energyData);

// module.exports = Data;
// export function Data();

app.get("/energydata", function (req, res) {   
    User.find().then (function (allDetails) {
        res.render("list", { details: allDetails })
    })
});