var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://42mileslong:1D7h6qhY2r2sn6Dn@test-cluster-shard-00-00-w1irb.mongodb.net:27017,test-cluster-shard-00-01-w1irb.mongodb.net:27017,test-cluster-shard-00-02-w1irb.mongodb.net:27017/test?ssl=true&replicaSet=test-cluster-shard-0&authSource=admin";

function query(data) {
	MongoClient.connect(uri, function(err, db) {
	  console.log("CONNECTED TO THE DATABASE");

	  db.collection("reports").insertOne(data,function(err,res){
	  	console.log("Document Inserted");


	  	db.close();
	  });
	});
}


var express = require("express");
var app= express();
var serv = require("http").Server(app);

app.get("/", function (req, res) {
	res.sendFile(__dirname+ "/client/index.html");
});
app.use("/client", express.static(__dirname + "/client"));
serv.listen(3000);

var io=require("socket.io")(serv,{});
io.sockets.on("connection", function(socket){
	socket.emit("Connected",{});

	socket.on("Report",function(reportData){
		query(reportData);
	});
});
