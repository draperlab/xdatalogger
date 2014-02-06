#Draper Logging Server

The Draper Logging Server is a lightweight Node.js server written using the Express.js package.  There are some dependencies, including optimist.js and mongo.js.


## Quick Start

 The quickest way to get started with the Draper Logging server is to execute `server` as shown below:

Install dependencies:

    $ npm install

 Start the server:
    
    $ node server.js

## Details

  * By default runs on 0.0.0.0:1337, port can be altered by using the --port flag
  * Expects to already have `mongod` running and will look for the db xdata by default, this can be altered by using the --host flag
  * Expects the mongo collection `logs` under the db.