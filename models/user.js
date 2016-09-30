module.exports = class User{
	constructor(name='', email='', occupation='', birthday=''){
		this.name=name;
		this.email=email;
		this.occupation=occupation;
		this.birthday=birthday;
	}
	display(){
		console.log(this.name);
	}
}