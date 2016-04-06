/**
 * webapp-template
 * https://github.com/odentools/webapp-template
 * (C) 2016 - OdenTools; Released under MIT License.
 */

'use strict';

var express = require('express'),
	bodyParser = require('body-parser');

var app = express();

// Set the static assets directories
app.use(express.static('bower_components'));
app.use(express.static('public'));

// Routes
app.get('/', function (req, res) {
	res.send('Hello');
});

// Start the server
var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('The app listening on port %s:%s', host, port);
});
