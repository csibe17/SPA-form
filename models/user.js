module.exports = class User{

	constructor(name='', occupation='', email='', birthday=''){
		this.name=name;		
		this.occupation=occupation;
		this.email=email;
		this.birthday=birthday;
	}

	toString(){
		return `Name: ${this.name}\nEmail: ${this.email}\nOccupation: ${this.occupation}\nBirthday: ${this.birthday}`;
	}

}