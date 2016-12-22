// Grab the articles as a json
$.getJSON("/news", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#news").append("<p data-id='" + data[i]._id + "'>" + "<strong>" + data[i].title + "</strong>" + "<br />" + "<a href='" + data[i].link + "' target='_blank'>Read more here</a>");
  }
});

// + "<form method='POST'><input type='text' name='comment' id='bodyinput'><br><input type='submit' id='savecomment' data-id='" + data._id + "' value='submit'></form>"



$(document).on('click', '#savecomment', function(){

	$('#comment').empty();
	$('#commentResults').empty();

	var thisId =$(this).attr('data-id');
	modal.style.display = "block";

	//Make ajax call for the news story
	$.ajax({

		method: 'GET',
		url: '/news/' + thisId		

	})

	.done(function(data){

		console.log(data)

		$("#comment").append("<h2>" + data.title + "</h2>");

		$('.modal-header').append('<span class="close">&times;</span><h2>' + data.title + '</h2><hr>');
	    // An input to enter a new title
	    $('#comment').append('<textarea id="bodyinputX" name="body"></textarea>');
	    $('#commentResults').append('<div id="commentResults" name="commentbody"></div>');
	    $('#comment').append('<button data-id="' + data._id + '" id="savecomment">Save Comment</button>');
	    //print on modal footer
	    $('.modal-footer').append('<hr><textarea id="bodyinput" name="body"></textarea>');
	    $('.modal-footer').append('<button data-id="' + data._id + '" id="savenote">Leave a comment</button>');


	    if(data.comment){

	    	for (var i = 0; i < data.note.length; i++) {
          	// console.log( data.note[i].body);

	          	$('#commentResults').prepend('<span class="dataTitle" data-id=' + data.note[i]._id + ' > '+data.note[i].body+' </span><span class="deleteComment" data-id=' + data.note[i]._id + ' photo-id=' + data._id + '> X </span><br>');
	          
	          	//print on comments on footer
	          	$('.modal-body').prepend('<span class="dataTitle" data-id=' + data.note[i]._id + ' > '+data.note[i].body+' </span><span class="deleteComment" data-id=' + data.note[i]._id + ' photo-id=' + data._id + '> X </span><br>');

        	}

	    }

	})

})



//click on Save Comment

$(document).on('click', '#news', function(){

	var thisId = $(this).attr('data-id');
	modal.style.display = "block";

	$.ajax({
		method: 'POST',
		url: '/news/' + thisId,
		data: {
			body: $('#bodyinput').val()
		}
	})

	.done(function(){

		console.log(data);

		$('#comment').empty();

	});

	$('#bodyinput').val("");

});



// Click to delete

$(document).on('click', '.deleteComment', function(req, res){
	var thisId = $(this).attr('data-id');

	$.ajax({
		method: "DELETE",
		url: '/news/' + thisId,
		data: {
      		body: $('#bodyinput').val()
    	}
	})

	.done(function(data){
		resetComments(thisId);
	});
});


function resetComments(placeHolder){
	$('#comment').empty();
	$('#commentResults').empty();
	$('.modal-header').empty();
	$('.modal-body').empty();
	$('.modal-footer').empty();

	var thisId = placeHolder;

	$.ajax({
		method: "GET",
		url: "/news/" + thisId
	})

	.done(function( data ) {
      console.log( data );
      $('#comment').append('<h2>' + data.title + '</h2>');
      //print on modal header
      $('.modal-header').append('<span class="close">&times;</span><h2>' + data.title + '</h2><hr>');
      
      $('#comment').append('<textarea id="bodyinputX" name="body"></textarea>');
      $('#commentResults').append('<div id="commentResults" name="commentbody"></div>');
      $('#comment').append('<button data-id="' + data._id + '" id="savecomment">Leave a Comment</button>');

      //print on modal footer
      $('.modal-footer').append('<hr><textarea id="bodyinput" name="body"></textarea>');
      $('.modal-footer').append('<button data-id="' + data._id + '" id="savecomment">Leave a Comment</button>');

      if(data.comment){
        
        for (var i = 0; i < data.comment.length; i++) {
          

          $('.modal-body').prepend('<span class="dataTitle" data-id=' + data.comment[i]._id + ' > '+data.comment[i].body+' </span><span class="deleteComment" data-id=' + data.comment[i]._id + ' photo-id=' + data._id + '> X </span><br>');

        }
      }
    });
};



//Get modal
var modal = document.getElementById('myModal');





//Get <span> element
var span = document.getElementsByClassName('close')[0];




$(document).on('click', '.close', function(){
		
		$('.modal-header').empty();
	  	$('.modal-footer').empty();
	  	$('.modal-body').empty();
	    modal.style.display = "none";
    
    
});


























