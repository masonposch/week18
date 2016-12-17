// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


// Requiring our Note and Article models
// Requiring our Note and Article models
var Comment = require("./models/Comment.js");
var News = require("./models/News.js");

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

	request('http://www.npr.org/sections/news/', function(error, response, html){

		var $ = cheerio.load(html);

		$('.title').each(function(i, element) {

			var result = {};

			result.title = $(this).text();
    		result.link = $(this).children("a").attr("href");

      		var entry = new News(result);

      		// Now, save that entry to the db
      		entry.save(function(err, doc) {
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

//Get the new scraped from mongoDB
app.get('/news', function(req, res){

	News.find({}, function(error, doc){

		if(error){
			console.log(error);
		} else {
			res.json(doc);
		}

	});

});


//Grab News by its objectId
app.get('news/:id', function(req, res){

	New.findOne({ "_id" : req.params.id })

	.populate('comment')

	.exec(function(error, doc){

		if(error){
			console.log(error);
		} else {
			res.json(doc);
		}

	});

});


//Create new comment or replace existing comment
app.post('/news/:id', function(req, res){

	var newComment = new Comment(req.body);

	newComment.save(function(error, doc){

		if(error){
			console.log(error);
		} else {

			News.findOneAndUpdate({ "_id": req.params.id }, { "comment": doc._id })

			.exec(function(error, doc){

				if(error){
					console.log(error);
				} else {
					res.send(doc);
				}

			});

		}

	});

});





// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});










