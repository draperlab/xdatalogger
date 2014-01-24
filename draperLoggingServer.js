var http = require('http');
var fs = require('fs');

var databaseUrl = "xdata"; // "username:password@example.com/mydb"
var collections = ["logs"]
var db = require("mongojs").connect(databaseUrl, collections);

var args;
var serverAddress;
var ipAddressList = getExternalIPs();
var port = 1337;
var printDebugging = false;

if(process.argv.length >2) {

	args = new Object() 
 
	for (var i = process.argv.length - 1; i >= 2; i--) {
		var argVal = process.argv[i].split("=");
		if(argVal.length >1)
		{
			args[argVal[0]]=argVal[1];
		}
		else
		{
			args[argVal[0]]=true;
		}
	};
}

if(args && args["port"])
{
	port = parseInt(args["port"]);
}

if(args && args["debugging"])
{
	printDebugging = true;
}

if(args && args["address"])
{
	serverAddress = args["address"];
	http.createServer(processLogMessage).listen(port, serverAddress);
	console.log('Server running at ' + serverAddress + ":" + port);

} else if (ipAddressList.length > 1)
{
	for (var i = 0; i < ipAddressList.length; i++) {
		if(ipAddressList[i])
		{
			console.log(i + ") " + ipAddressList[i].hwName + ": " + ipAddressList[i].address);
		}
	}

	var readline = require('readline');

	var rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});

	rl.question("Select one of the IP addresses listed above by typing the corresponding number: ", function(answer) {
	  	var selectedIndex = parseInt(answer);

	  	serverAddress = ipAddressList[selectedIndex].address;

	 	rl.close();
	  	http.createServer(processLogMessage).listen(port, serverAddress);
		console.log('Server running at ' + serverAddress + ":" + port);
	});
}else if (ipAddressList.length == 1)
{
	serverAddress = ipAddressList[0].address;
	http.createServer(processLogMessage).listen(port, serverAddress);
	console.log('Server running at ' + serverAddress + ":" + port);
}






function processLogMessage(req, res)
{
	if(req.method.toUpperCase() == "OPTIONS")
	{
		if(printDebugging){console.log("start CORS auth");}
		
		res.writeHead(
			204, 
			"No Content", 
			{
				"Access-Control-Allow-Headers": "origin, content-type",
				"Access-Control-Allow-Origin": 	"*",
				"Access-control-Allow-Methods": "POST",
			}
		);
		res.end();
	}
	else
	{
		var reqID = Math.floor(100*Math.random());
		if(printDebugging){console.log("START REQ "+ reqID);}
		var postContents = "";
		req.setEncoding('utf8');
		req.addListener("error", function(err){
			console.log("request error: " + reqID);
			console.log(err);
		});
		req.addListener("close", function(){
			console.log("request closed: " + reqID);
		});
		req.addListener("data", function (chunk){
			postContents += chunk;
			if(printDebugging){console.log("DATA FIRED: " + reqID);}
		});
		req.addListener("end", function (){
			if(printDebugging){console.log("END FIRED: " + reqID);}
			console.log(postContents);
			db.logs.save(JSON.parse(postContents))
			fs.appendFile('xdata.log', postContents + '\n', function(err){
				if(err) console.log(err);
				if(printDebugging){console.log("Wrote log message to file: " + reqID);}
			});
			res.writeHead(
				200,
				{
					"Access-Control-Allow-Origin": 	"*",
					"Content-Type": "text/plain"
				}
			);
	    		res.end(req.socket.remoteAddress);
			if(printDebugging){console.log("END REQ: " + reqID);}
		});
	}	
}


function getExternalIPs(){
	var nics = require('os').networkInterfaces();
	var externalAddrs = [];

	
	Object.keys(nics).forEach(function(nic){
		nics[nic].forEach(function(endpoint){
			if(endpoint.family === 'IPv4' && !endpoint.internal)
				var addr = {hwName:nic, address:endpoint.address};
				externalAddrs.push(addr);
		});
	});
	if(printDebugging)
	{
		console.log("External Network Interfaces found on this machine:");
		console.log(externalAddrs);
	}

	return externalAddrs;
}

