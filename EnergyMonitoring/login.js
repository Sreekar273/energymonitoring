import mongoose from 'mongoose';
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/login", function(req, res){
    res.sendFile(__dirname + "first.html");
});