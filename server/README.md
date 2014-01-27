#Draper's Logging Server

##Running the Logging server
The logging server is a lightweight Node.js application and logs to a mongodb backend.

Requirements:
	-[node.js][node]
	-[mongodb][mongo]

###Install node package dependencies
The Draper server relies on expressjs, mongojs, and optimist.

> npm install


##Test locally
First you need to start the mongo daemon and run the server.  The server accept option arguments of host, to set the mongodb host and the port to run the server on.

> mongod &
> node server.js --port=1337&

###Logging in Javascript

1. Instantiate the logging object
	> var ac = new activityLogger()

2. Register the logging object with logging server address, component name, version, and session id.
	> ac.registerActivityLogger("http://localhost:1337", "component_name", "0.1", Math.floor(Math.random()*10000+1))

3. Logging Events
	a. User Events
		> ac.logUserActivity('Testing User Activity Message', 'Watch', ac.WF_EXAMINE );

	b. System Events
		> ac.logSystemActivity('Testing System Activity Message', {'Test Window Val':'Main', 'Data Source':'healthCare'});

	a. Layout Events
		> ac.logUILayout('Testing User Activity Message', 'SearchWindow A', true, 234, 256, 33, 500);

###Logging in Python

1. Instantiate the logging object
	> ac = ActivityLogger()

2. Register the logging object with logging server address, component name, version, and session id.
	> ac.registerActivityLogger("http://localhost:1337", "component_name", "0.1", Math.floor(Math.random()*10000+1))

3. Logging Events
	a. User Events
		> ac.logUserActivity('Testing User Activity Message', 'Watch', ac.WF_EXAMINE );

	b. System Events
		> ac.logSystemActivity('Testing System Activity Message', {'Test Window Val':'Main', 'Data Source':'healthCare'});

	a. Layout Events
		> ac.logUILayout('Testing User Activity Message', 'SearchWindow A', True, 234, 256, 33, 500);


[mongo]: http://www.mongodb.org/
[node]: http://nodejs.org/
