// Grab the articles as a json
$.getJSON("/news", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#news").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});




$(document).on('click', 'p' function(){

	$('comments').empty();

	var thisId =$(this).attr('data-id');

	//Make ajax call for the news story
	$.ajax({

		method: 'GET',
		url: '/news/' + thisId		

	})

	.done(function(data){

		console.log(data)

		$("#comments").append("<h2>" + data.title + "</h2>");
	    // An input to enter a new title
	    $("#comments").append("<input id='titleinput' name='title' >");
	    // A textarea to add a new note body
	    $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
	    // A button to submit a new note, with the id of the article saved to it
	    $("#comments").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");


	    if(data.comment){

	    	$('#titleinput').val(data.comment.title);

	    	$('#bodyinput').val(data.comment.body);

	    }

	})

})


//click on Save Comment

$(document).on('click', '#savecomment', function(){

	var thisId = $(this).attr('data-id');

	$.ajax({
		method: 'POST',
		url: '/news/' + thisId,
		data: {
			title: $('#titleinput').val();
			body: $('#bodyinput').val();
		}
	})

	.done(function(){

		console.log(data);

		$('#comments').empty();

	});

	$('#titleinput').val("");
	$('#bodyinput').val("");

})





















