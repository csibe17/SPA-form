// Used for creating and sending the server request
var request = (function(){
	var requestBody={};

	function create(){
		requestBody.name=$('#name').val();
		requestBody.occupation=$('#occupation').val();
		requestBody.email=$('#email').val();
		requestBody.birthday=$('#birthdaypicker').data("DateTimePicker").date().format("YYYY-MM-DD");
	}

	function send(){
		// clear visible messages
		messageHandler.clearMessages();

		// send AJAX POST
		$('#progress-icon').show();
		$.ajax({
			url: "addUser",
			type: "POST",
			data: JSON.stringify(requestBody),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',			
			success: response.handleSuccess,
			error: response.handleError
		});
	}

	return {
		create: create,
		send: send
	};

})();


// Used for handling the server's response
var response = (function(){

	// Handle successful AJAX
	function handleSuccess(data){
		// hide progress icon
		$('#progress-icon').hide();

		// go to top
		$('html,body').animate({ scrollTop: 0 }, 'slow');

		// parse and show all messages from response
		for (var msg = 0; msg < data.messages.length; msg++) {
			messageHandler.addMessage(data.messages[msg]);
		}

		// reset every UI elements if success
		if(data.code===200){
			$('input[type="text"]').val('');
			$('input[type="text"]').each(function(){
				clientValidator.validateField({field:this,fieldName:this.id});
			});
			var defDate = $('#birthdaypicker').data("DateTimePicker").defaultDate();
			$('#birthdaypicker').data("DateTimePicker").date(defDate).viewMode("years");
		}
		if(data.code===400){

		}
	}

	// Handle errorful AJAX
	function handleError(err){
		// hide progress icon
		$('#progress-icon').hide();

		// go to top
		$('html,body').animate({ scrollTop: 0 }, 'slow');

		// show error message if the request could not came back
		if(err.readyState>0){
			messageHandler.addMessage({message:err.responseText+" occured",messageType:"danger"});
		}
		else{
			messageHandler.addMessage({message:"Communication error occured",messageType:"danger"});
		}
	}

	return {
		handleSuccess: handleSuccess,
		handleError: handleError
	};

})();


// Used for message handling
var messageHandler = (function(){
	
	function clearMessages(){
		$('#message-area').html("");
	}

	function addMessage(message){
		var msg = '<div class="alert alert-'+message.messageType+' alert-dismissible" role="alert">' +
		'<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> ' +
		message.message.replace(/\n/g, "<br/>") +
		'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
		'</div>';

		$('#message-area').append(msg);
	}

	return {
		clearMessages: clearMessages,
		addMessage: addMessage
	};

})();