'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let token ="EAAFaBYXNrs4BAN1PsZAGGSxIILSBarZBxTTJTZBU6OyPIRlZAeZBaoZAEvwbY8XoJ6ERzWRYWAxFrHayH2FiDYooVRoixxqKLVDQ0HN1rC9TN7ZBBLoWYD1nTvk3CdnRtMiDgFrRuRXLXQ5BBh7FweXpzokbOxkGPS2hku8ZCb9FA2ozbIW6ngZAr"
//Routes

app.get('/',(req,res) => {

    res.send("Hi I am a chat bot");
});

app.get('/webhook/', (req,res)=>{
    if(req.query['hub.verify_token'] === "Aniket"){
        res.send(req.query['hub.challenge'])
    }
    res.send("wrong Token");
});

app.post('/webhook/',(req,res)=>{

    let messaging_events = req.body.entry[0].messaging;
    for(let i =0;i<messaging_events.length;i++){
        let event = messaging_events[i];
        let sender = event.sender.id;
        if(event.message && event.message.text){
            let text = event.message.text;
            sendText(sender,"Text echo: "+text.substring(0,100))
        }
    }
res.sendStatus(200);
});

function sendText(sender, text){
    let messageData = {text: text}
    request({
        url:"https//graph.facebook.com/v4.0/me/messages",
        qs: {access_token: token},
        method: "POST",
        json: {
            recipient: {id: sender},
            message: messageData
        },
        function(error,response,body){
            if(error){
                console.log(error);
            }
            else if(response.body.error){
                console.log("response body error");

            }
            
        }
    });
}

app.listen(app.get('port'),()=>{
    console.log("Server is running");
});