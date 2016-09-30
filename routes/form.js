module.exports = function(app){

	var validator = require('../utils/validator');
	var User = require('../models/user');
	var occupation = require('../models/occupation');
	var messages = require('../models/messages');

	//var { message, messageType } = messages.fieldMissing;
	
	//shownMessages.push(messages.success);
	//shownMessages.push(messages.welcome);

	app.get('/',function(req,res){
		res.redirect("/fillForm");
		
	});

	app.get('/fillForm',function(req,res){
		res.render('form', {
			shownMessages: [messages.welcome],
			occupations: occupation.occupations,
			nameMissing: true,
			emailMissing: true
		});
	});

	app.post('/addUser',function(req,res){
		let shownMessages = [];
		res.render('form', {
			shownMessages: [],
			occupations: occupation.occupations,
			nameMissing: false,
			emailMissing: false
		});
	});

}