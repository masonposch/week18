//Require mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


//Create CommentSchema

var CommentSchema = new Schema({

	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	}

});



// Create the Note model with the NoteSchema
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Note model
module.exports = Comment;