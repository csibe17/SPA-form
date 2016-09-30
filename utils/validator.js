var validator = {
	isValidName: function(name){
		return /^[a-zA-Z ]+$/.test(name);
	},
	isValidEmail: function(email){
		return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
	},
	isValidOccupation: function(occupation){
		return /^[a-zA-Z ]+$/.test(occupation);
	},
	isValidDate: function(date){
		return /^[1,2][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]$/.test(date);
	}
};
module.exports = validator;