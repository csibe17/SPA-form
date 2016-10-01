var request = (function(){
	var requestBody={};

	function create(){
		requestBody.name=$('#name').val();
		requestBody.occupation=$('#occupation').val();
		requestBody.email=$('#email').val();
		requestBody.birthday=$('#birthdaypicker').data("DateTimePicker").date().format("YYYY-MM-DD");
	}
	function send(){
		console.log(JSON.stringify(requestBody));

		messageHandler.clearMessages();
		$('#progress-icon').show();
		/*$.post('/addUser',,function(){

		});*/

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


var response = (function(){

	function handleSuccess(data){
		$('#progress-icon').hide();
		for (var msg = 0; msg < data.messages.length; msg++) {
			messageHandler.addMessage(data.messages[msg]);
		}
		if(data.code===200){
			//$('input[type="text"]').val('');
			$('#birthdaypicker').data("DateTimePicker").defaultDate();
		}
		if(data.code===400){

		}
	}
	function handleError(err){
		$('#progress-icon').hide();
		console.log(err);
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


var messageHandler = (function(){
	
	function clearMessages(){
		$('#message-area').html("");
	}
	function addMessage(message){
		var msg = '<div class="alert alert-'+message.messageType+' alert-dismissible" role="alert">' +
		'<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> ' +
		message.message +
		'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
		'</div>';

		$('#message-area').append(msg);
	}

	return {
		clearMessages: clearMessages,
		addMessage: addMessage
	};
})();