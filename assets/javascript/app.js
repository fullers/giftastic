
//Intial array of topics
var topics = ['Dragon Ball Z', 'Bleach', 'Sword Art Online', 'Full Metal Alchemist'];


function displayTopicInfo(){

	$('#gifArea').empty();

	var topic = $(this).attr('data-name');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10&fmt=JSON";

	$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
             
            for(var i = 0; i < 10; i++) {
			// Creates a generic div to hold the topic
			var topicDiv = $('<div class="topic">');

			// Retrieves the Rating Data
			var rating = response.data[i].rating;

			// Creates an element to have the rating displayed
			var pOne = $('<p>').text( "Rating: " + rating);

			// Displays the rrating
			topicDiv.append(pOne);

			// Creates an element to hold the image 
			var image = $('<img>')
			image.attr('src', response.data[i].images.fixed_height_small_still.url);
			image.attr('data-still', response.data[i].images.fixed_height_small_still.url);
			image.attr('data-animate', response.data[i].images.fixed_height_small.url);
			image.attr('data-state', 'still');
			image.addClass('topicImage');

			// Appends the image
			topicDiv.append(image);

			// Puts the entire Movie above the previous movies.
			$('#gifArea').prepend(topicDiv);

			}

	});
}

// Generic function for displaying topic data 
function genButtons(){ 

	// Deletes the topics prior to adding new topics (this is necessary otherwise you will have repeat buttons)
	$('#btnArea').empty();

	// Loops through the array of topics
	for (var i = 0; i < topics.length; i++){

		// Then dynamicaly generates buttons for each topic in the array

		// Note the jQUery syntax here... 
	    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
	    a.addClass('btn btn-warning topic'); // Added a class 
	    a.attr('data-name', topics[i]); // Added a data-attribute
	    a.text(topics[i]); // Provided the initial button text
	    $('#btnArea').append(a); // Added the button to the HTML
	}
}

// This function handles events where one button is clicked
	$('#addTopic').on('click', function(){

		// This line of code will grab the input from the textbox
		var topic = $('#topic-input').val().trim();

		// The topic from the textbox is then added to our array
		topics.push(topic);
		
		// Our array then runs which handles the processing of our topic array
		genButtons();

		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	});

	$('.topicImage').on('click', function(){
	    	
	        var state = $(this).attr('data-state'); 
	       
            if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
          
	    });

	// Generic function for displaying the topicInfo
	$(document).on('click', '.topic', displayTopicInfo);

	// This calls the genButtons() function
	genButtons();


