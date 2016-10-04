var expect = require('chai').expect;
var User = require('../../models/user');

describe("Test for backend User model", function () {
    var user;

    beforeEach(function () {
        user = new User();
    });

    it("should create the object with empty values", function () {
        expect(user.name).to.equal('');
        expect(user.occupation).to.equal('');
        expect(user.email).to.equal('');
        expect(user.birthday).to.equal('');
    });

    it("should create the object with valid values", function () {
        var user1 = new User('John Bow', 'IT Coordinator', 'mail@john.com', '1955-10-20');

        expect(user1.name).to.be.a('string');
        expect(user1.occupation).to.be.a('string');
        expect(user1.email).to.be.a('string');
        expect(user1.birthday).to.be.a('string');

        expect(user1.name).to.equal('John Bow');
        expect(user1.occupation).to.equal('IT Coordinator');
        expect(user1.email).to.equal('mail@john.com');
        expect(user1.birthday).to.equal('1955-10-20');
    });

    it("should check the stringified version of the user", function () {
        var user1 = new User('John Bow', 'IT Coordinator', 'mail@john.com', '1955-10-20');

        expect(user1.toString()).to.be.a('string');
        expect(user1.toString()).to.be.equal('Name: John Bow\nEmail: mail@john.com\nOccupation: IT Coordinator\nBirthday: 1955-10-20');
    });

});
