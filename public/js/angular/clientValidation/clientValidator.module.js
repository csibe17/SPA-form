// Used for validating all inputs of the user
angular.module('clientValidator', [])
	.service('ClientValidatorService', function () {
		var _status = {
			ok: "ok",
			error: "error",
			off: "off"
		};

		var errors = {
			name:{
				type:"",
				icon:"",
				text:""
			},
			email:{
				type:"",
				icon:"",
				text:""
			},
			occupation:{
				type:"",
				icon:"",
				text:""
			}
		};

		// Private method to store specific validators
		function getValidator(type) {
			var validators = {
				"name": new XRegExp("^[\\p{L} ]+$"),///^\\p{L}+$/,
				"occupation": /^[a-zA-Z \'\&\/\-\(\),]*$/,//new XRegExp("^[\\p{L} \'\&\/\-\(\)]*$"),
				"email": /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
			};

			return validators[type];
		}

		// Private method to set the status of the field
		function setStatus(fieldName, status) {
			switch (status) {
				case _status.ok:
					errors[fieldName].type = "has-success";
					errors[fieldName].icon = "glyphicon-ok";
					errors[fieldName].text = "Valid " + fieldName + ".";
					break;
				case _status.error:
					errors[fieldName].type = "has-error";
					errors[fieldName].icon = "glyphicon-remove";
					errors[fieldName].text = "Please enter a valid " + fieldName + ".";
					break;
				case _status.off:
					errors[fieldName].type = "";
					errors[fieldName].icon = "";
					errors[fieldName].text = "";
					break;
			}
		}

		// Public method to validate field
		function validateField(fieldObj) {
			if (fieldObj.value === "") {
				setStatus(fieldObj.name, _status.off);
			}
			else if (getValidator(fieldObj.name).test(fieldObj.value)) {
				setStatus(fieldObj.name, _status.ok);
			}
			else {
				setStatus(fieldObj.name, _status.error);
			}
		}

		// Public method to return all errors
		function getErrors(){
			return errors;
		}

		return {
			validateField: validateField,
			getErrors: getErrors
		};

	});
