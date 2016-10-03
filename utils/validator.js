var messages = require('../models/messages');
var Response = require('../models/response');
var XRegExp = require('./3rdparty/xregexp-all');

module.exports = class Validator{

	constructor(requestBody){
		this.data = requestBody;
		this.response = new Response();
		this.valid = true;
	}

	validate(){
		// clear, init
		this.response.clearMessages();
		this.valid = true;

		// validate specific fields
		if(!this._isValidName(this.data.name)){
			this.response.addMessage(messages.nameError);
			this.valid = false;
		}
		if(!this._isValidEmail(this.data.email)){
			this.response.addMessage(messages.emailError);
			this.valid = false;
		}
		if(!this._isValidOccupation(this.data.occupation)){
			this.response.addMessage(messages.occupationError);
			this.valid = false;
		}
		if(!this._isValidDate(this.data.birthday)){
			this.response.addMessage(messages.dateError);
			this.valid = false;
		}
		if(Math.floor((new Date()-new Date(this.data.birthday))/(1000 * 60 * 60 * 24 * 365)) < 18){// calculate if under 18
			this.response.addMessage(messages.date18Error);
			this.valid = false;
		}

		// set response specifics
		if(!this.valid){
			this.response.code = 400;
		}
		else{
			this.response.code = 200;
			this.response.addMessage(messages.success);
		}
	}

	// Get privates
	getResponse(){
		return this.response;
	}

	getData(){
		return this.valid ? this.data : {};
	}

	isValid(){
		return this.valid;
	}
	
	// Specific validators
	_isValidName(name){
		//return /^[a-zA-Z ]+$/.test(name);
		return new XRegExp("^[\\p{L} ]+$").test(name);
	}

	_isValidEmail(email){
		return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
	}

	_isValidOccupation(occupation){
		//return /^[a-zA-Z ]*$/.test(occupation);
		return /^[a-zA-Z \'\&\/\-\(\),]*$/.test(occupation);//new XRegExp("^[\\p{L} \'\&\/\-\(\)]**$").test(occupation);
	}

	_isValidDate(date){
		return /^[1,2][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]$/.test(date);
	}

}