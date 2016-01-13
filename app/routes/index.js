'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var http = require('http');
var request = require('request');

var Searches = require('../models/users.js');
var Search = require('../models/users');

var $ = require("jquery")
 
var appUrl = "https://url-shortener-api-christoph-phillips.c9users.io/"

module.exports = function (app, passport) {


	app.route("/recent/searches")
		.get(function(req, res) {
			
			Searches.find({})
			.exec(function (err, result) {
				if (err) throw err
				
				result.sort(function(a, b) {
		
					return b.date - a.date;
				});
				
				console.log(result)
				result.splice(10, result.length)
				
				res.json(result)
				
			})
			
			//res.send("working")
		});

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	
	app.route('/:searchTerm')
		.get(function(req, res) {
			
			//GET SEARCH TERM
			var searchTerm = req.params.searchTerm;
			
			var paginate = req.query.offset
			console.log(paginate)
			
			//SAVE SEARCH TERM TO DB
			var searchObj = new Search();
			searchObj.searchTerm = searchTerm;
			searchObj.date = new Date()

			if (searchTerm !== "favicon.ico") {
				searchObj.save(function (err) {
					if (err) throw err;
					
						
					
					})
			
				}
						
	var apiUrl = "https://api.imgur.com/3/gallery/t/" + searchTerm;	


 var info;
 
var options = {
  url: apiUrl,
  headers: {
    'Authorization':'Client-ID 7662cb49bfa1f96'
  }
};
 
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    info = JSON.parse(body);
    
    var objArray = [];
   
    var lowerBound;
    var higherBound;
    
    if (paginate) {
    	lowerBound = ((paginate-1)*10) ;
    	higherBound = ((paginate-1)*10 + 10);
    }
    else if (!paginate || paginate === 0) {
	    lowerBound = 0;
	    higherBound = 10;
    }
    
    for (var i = lowerBound; i < higherBound; i++) {
    	var photo = {
    		index: i,
    		text: info.data.items[i].title,
    		url: info.data.items[i].link,
    		userUrl: "http://imgur.com/user/" + info.data.items[i].account_url
    	}
    	objArray.push(photo)
    }
    
    
    
    
    
    res.json(objArray)
  }
}
 
 
 //URLs, alt text and page urls
request(options, callback);
			

			
			
});
	
	
	
		
};
	
