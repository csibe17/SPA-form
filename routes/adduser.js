module.exports = function(app){

	var Validator = require('../utils/validator');
	var Response = require('../models/response');
	var User = require('../models/user');

	app.post('/addUser', function(req,res){
		if (!req.body || Object.keys(req.body).length === 0) return res.sendStatus(400);

		var validator = new Validator(req.body);
		validator.validate();
		if(validator.isValid()){
			var {name,occupation,email,birthday}=validator.getData();
			var newUser = new User(name,occupation,email,birthday);
			console.log('User added at: '+new Date());
			console.log(newUser.toString());
			validator.getResponse().addMessage({message:`Successful registration with the following data:\n${newUser.toString()}`,messageType:"info"});
		}

		res.end(validator.getResponse().create());
	});

}