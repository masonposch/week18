// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
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