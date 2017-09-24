'use strict';

// Website to Server

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = express()
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));

    ws.on('message', function (msg) {
	console.log('Received message');
	query(JSON.parse(msg));
    });

});


// Server to Database

var MongoClient = require('mongodb').MongoClient;                               
                                                                                
var uri = "mongodb://heroku:ilqHPiWgfHepCpNC@narc-cluster-shard-00-00-uij1v.mon\
godb.net:27017,narc-cluster-shard-00-01-uij1v.mongodb.net:27017,narc-cluster-sh\
ard-00-02-uij1v.mongodb.net:27017/test?ssl=true&replicaSet=narc-cluster-shard-0\
&authSource=admin";                                                             
                                                                                
function query(data) {                                                          
    MongoClient.connect(uri, function(err, db) {                                
        console.log("Connected to database");                                   
                                                                                
        db.collection("reports").insertOne(data,function(err,res){              
            console.log("Document inserted");                                   
                                                                                
            db.close();                                                         
        });                                                                     
    });                                                                         
}
