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
var exphbs = require('express-handlebars');
var Nodemon = require("nodemon"); 
// Mongoose mpromise deprecated - use bluebird promises
var Promise = require("bluebird");

mongoose.Promise = Promise;


// Initialize Express
var app = express();

var port = process.env.PORT || 3000;



// Use handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

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
	res.redirect('/index');
})


app.get('/index', function(req, res){

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

	// res.send("Scrape Complete");
	res.render('index');

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

	News.findOne({ "_id" : req.params.id })

	.populate('comment')

	.exec(function(error, doc){

		if(error){
			console.log(error);
		} else {
			res.json(doc);
		}

	});

});





//Begin the route to delete notes
app.delete('/deletecomment/:id', function(req, res){
  console.log(req.params.id);

  Comment.remove({ '_id': req.params.id })

  .exec(function (err, doc){
    if(error){
      console.log(error)
    } else {
      res.json(doc);
    }
  });
});


// Route to replace existing note of article with new one
app.post('/news/:id', function(req, res){
  var newComment = new Comment(req.body);

  newComment.save(function(err, doc){
    if(err){
      console.log(err);
    } else {
      News.findOneAndUpdate({ '_id': req.params.id },{$push: {'comment':doc._id}}, {new: true})

      .exec(function(err, doc){
        if(err){
          console.log(err);
        } else {
          res.send(doc);
        }
      });
    }
  });
});


// //Create new comment or replace existing comment
// app.post('/news/:id', function(req, res){

// 	var newComment = new Comment(req.body);

// 	newComment.save(function(error, doc){

// 		if(error){
// 			console.log(error);
// 		}

// 	});

// });







// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});










