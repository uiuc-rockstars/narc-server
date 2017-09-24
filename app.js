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

// Website to Server

var app = require("express")();
var serv = require("http").Server(app);
var io = require("socket.io")(serv);

//app.get("/", function (req, res) {
//    res.sendFile(__dirname+ "/index.html");
//});

serv.listen(80);

io.sockets.on("connection", function(socket){
    socket.emit("Connected");
    socket.on("report", function(reportData){
	query(reportData);
    });
});
