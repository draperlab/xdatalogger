#!/usr/bin node
/**
* Draper Logging Server
*
* This is a simple lightweight server that handles the registration of logging
* sessions and receives logs and passes them to a local MongoDB.
*
* @author Draper Laboratory
* @date 2014
*/

/**
 * Module dependencies.
 */
var express = require('express');
var db = require("mongojs");
var argv = require("optimist").argv;

var host = "xdata",
port = "1337";

if (!!argv.host) {
	host = argv.host;
}
if (!!argv.port) {
	port = argv.port;
}

// MongoDB interface
var databaseUrl = "xdata"; // "username:password@example.com/mydb"
var collections = ["logs", "sessions"]
db = db.connect(databaseUrl, collections);

var app = express();
app.use(express.bodyParser());

// endpoint to receive logs
app.post('/send_log', function(req, res){
	console.log('recieved log')
	var data = req.body;    
  console.log(data)
  data.timestamp = new Date(data.timestamp)
  console.log(data)
  db.logs.insert(data, function (err, result) {
    
    // Allow CORS
    var origin = (req.headers.origin || "*");
    res.header("Access-Control-Allow-Origin", origin);
    res.json({});  	
res.end()
  });
});

app.get('/session', function(req, res){
	console.log('query:', req.query)
});

// endpoint to register session
app.get('/register', function(req, res){
	console.log('registering session', req.connection.remoteAddress)
	var client_ip = req.connection.remoteAddress
  var data = {client_ip: client_ip};
	console.log(data);
  db.sessions.insert(data, function (err, result) {
    
    // Allow CORS
    var origin = (req.headers.origin || "*");
    res.header("Access-Control-Allow-Origin", origin);

    console.log(result, result._id)
  	res.json({
			session_id: result._id,
			client_ip: req.connection.remoteAddress
		})
    res.end()
	})  
});

// run server
var serverAddress = '0.0.0.0';
app.listen(+port, serverAddress);
console.log('Listening on port ' + port);
