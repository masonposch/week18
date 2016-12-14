// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


// Requiring our Note and Article models


// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Mongoose mpromise deprecated - use bluebird promises
var Promise = require("bluebird");

mongoose.Promise = Promise;


// Initialize Express
var app = express();





//ESSENTIALS
//=============


app.use(logger('dev'));
app.use(bodyParser.urlencoded({
	extended: false
}));

//Make public a static directory
app.use(express.static('public'));

//Database configuration with Mongoose
mongoose.connect("mongodb://localhost/week18");
var db = mongoose.connection;

//Show any mongoose errors
db.on('error', function(error) {
	console.log("Mongoose error" + error);
});

//On successful connection
db.once('open', function(req, res) {
	console.log("Mongoose connection successful");
});





//ROUTES
//===========

app.get('/', function(req, res){
	res.send(index.html);
})


app.get('/scrape', function(req, res){

	request('http://www.cnn.com/', function(error, response, html){

		var $ = cheerio.load(html);

		$('.cd__headline-text').each(function(i, element) {

			var result = {};

			result.title = $(this).children("a").text();
      		result.link = $(this).parent("a").attr("href");

      		var story = new News(result);

      		// Now, save that entry to the db
      		story.save(function(err, doc) {
        		// Log any errors
		        if (err) {
		          console.log(err);
		        }
		        // Or log the doc
		        else {
		          console.log(doc);
		        }
      		});

		});	

	})

	res.send("Scrape Complete");

})












// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});










