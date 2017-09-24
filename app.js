// Website to Server

var express = require('express');
var socketio = require('socket.io');
var path = require('path');

var PORT = process.env.PORT || 3000;

var app = express();
var server = app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

var io = socketio(server);

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('report', (data) => {
	console.log('Received data');
	query({location:'test', message:'work please?'});
    });
    
    socket.on('disconnect', () => console.log('Client disconnected'));
});

// Server to Database

var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://heroku:ilqHPiWgfHepCpNC@narc-cluster-shard-00-00-uij1v.mongodb.net:27017,narc-cluster-shard-00-01-uij1v.mongodb.net:27017,narc-cluster-shard-00-02-uij1v.mongodb.net:27017/test?ssl=true&replicaSet=narc-cluster-shard-0&authSource=admin";

function query(data) {
    MongoClient.connect(uri, function(err, db) {
	console.log("Connected to database");

	db.collection("reports").insertOne(data,function(err,res){
	    console.log("Document inserted");

	    db.close();
	});
    });
}
