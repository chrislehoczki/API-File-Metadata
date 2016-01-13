'use strict';

var express = require('express');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var app = express();

require('dotenv').load();

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

var path = process.cwd();


app.post('/file', upload.single('0'), function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
    res.json(req.file.size)
});

app.get("/", function (req,res){
			res.sendFile(path + "/public/index.html")
			
		});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});