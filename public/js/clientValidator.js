// Used for validating all inputs of the user
var clientValidator = (function(){
	var _status = {
		ok: "ok",
		error: "error",
		off: "off",
	}

	// Private method to store specific validators
	var getValidator = (type) => {
		var validators = {
			"name": new XRegExp("^[\\p{L} ]+$"),///^\\p{L}+$/,
			"occupation": /^[a-zA-Z \'\&\/\-\(\)]*$/,//new XRegExp("^[\\p{L} \'\&\/\-\(\)]*$"),
			"email": /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
		}

		return validators[type];
	}

	// Private method to set the status of the field
	var setStatus = (fieldName,status) => {
		// reset fields' status
		$('#status-icon-'+fieldName).removeClass('glyphicon-remove').removeClass('glyphicon-ok');
		$('#status-feedback-'+fieldName).removeClass('has-error').removeClass('has-success');

		// set new status
		switch(status){
			case _status.ok:
				$('#status-icon-'+fieldName).addClass('glyphicon-ok');
				$('#status-message-'+fieldName).html('Valid '+fieldName+'.');
				$('#status-feedback-'+fieldName).addClass('has-success');
				break;
			case _status.error:
				$('#status-icon-'+fieldName).addClass('glyphicon-remove');
				$('#status-message-'+fieldName).html('Please enter a valid '+fieldName+'.');
				$('#status-feedback-'+fieldName).addClass('has-error');
				break;
			case _status.off:
				$('#status-message-'+fieldName).html('');
				break;
		}		
	}
	
	// Public method to validate field
	function validateField(fieldObj){
		if(fieldObj.field.value===""){
			setStatus(fieldObj.fieldName,_status.off);
		}
		else if(getValidator(fieldObj.fieldName).test(fieldObj.field.value)){
			setStatus(fieldObj.fieldName,_status.ok);
		}
		else{
			setStatus(fieldObj.fieldName,_status.error);
		}
	}	

	return {
		validateField: validateField
	};

})();