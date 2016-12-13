//Require mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


//Create News schema
var NewsSchema = new Schema({

	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	// This only saves one note's ObjectId, ref refers to the Note model
	comment: {
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}

});

//Create the News model with the NewsSchema
var News = mongoose.model("News", NewsSchema);

//Export the model
module.exports = News;







