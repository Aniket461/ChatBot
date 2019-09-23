'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Routes

app.get('/',(req,res) => {

    res.send("Hi I am a chat bot");
});

app.get('/webhook/', (req,res)=>{
    if(req.query['hub.verify_token'] === "Aniket"){
        res.send(req.query['hub.challenge'])
    }
    res.send("wrong Token");
})

app.listen(app.get('port'),()=>{
    Console.log("Server is running");
});