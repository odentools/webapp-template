/**
 * webapp-template
 * https://github.com/odentools/webapp-template
 * (C) 2016 - OdenTools; Released under MIT License.
 */

'use strict';

var express = require('express');

var app = express();

// Publish the static directories
app.use(express.static('bower_components'));
app.use(express.static('public'));

// Use application/json for Content-Type of POST request
app.use(require('body-parser').json());

// Allow the Cross Domain Request from JavaScript
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

// Routes
app.use('/api/articles', require(__dirname + '/routes/api/articles'));

// Start the server
var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('The app listening on port %s:%s', host, port);
});
