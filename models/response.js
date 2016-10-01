module.exports = class Response{

	constructor(){
		this.response = {messages:[]};
	}

	// Getter/setters
	set code(code){
		this.response.code = code;
	}

	get code(){
		return this.response.code;
	}

	// Message related methods
	addMessage(message){
		this.response.messages.push(message);
	}

	hasMessages(){
		return this.response.messages.length > 0 ? true : false;
	}

	clearMessages(){
		this.response.messages = [];
	}

	// Build JSON object
	create(){
		return JSON.stringify(this.response);
	}

}