var expect = require('chai').expect;
var Validator = require('../../utils/validator');
var Response = require('../../models/response');
var messages = require('../../models/messages');

describe("Test for backend Validator util", function () {
    var validator;

    beforeEach(function () {
        validator = new Validator({});
    });

    it("should create the object with empty values", function () {
        expect(validator.data).to.deep.equal({});
        expect(validator.response).to.be.an.instanceof(Response);
        expect(validator.valid).to.equal(true);
    });

    it("should create the object with valid values", function () {
        validator = new Validator({
            name: "John Bow",
            email: 'mail@john.com',
            occupation: 'IT Coordinator',
            birthday: '1955-10-20'
        });
        expect(validator.data).to.deep.equal({
            name: "John Bow",
            email: 'mail@john.com',
            occupation: 'IT Coordinator',
            birthday: '1955-10-20'
        });
        expect(validator.response).to.be.an.instanceof(Response);
        expect(validator.valid).to.equal(true);
    });

    it("should validate values OK", function () {
        validator = new Validator({
            name: "John Bow",
            email: 'mail@john.com',
            occupation: 'IT Coordinator',
            birthday: '1955-10-20'
        });
        validator.validate();
        expect(validator.valid).to.equal(true);
        expect(validator.isValid()).to.equal(true);
        expect(validator.response.code).to.equal(200);
    });

    it("should validate values NOK - name", function () {
        validator = new Validator({
            name: "John9Bow",
            email: 'mail@john.com',
            occupation: 'IT Coordinator',
            birthday: '1955-10-20'
        });
        validator.validate();
        expect(validator.valid).to.equal(false);
        expect(validator.isValid()).to.equal(false);
        expect(validator.response.code).to.equal(400);
    });

    it("should validate values NOK - email", function () {
        validator = new Validator({
            name: "John Bow",
            email: 'mailjohn.com',
            occupation: 'IT Coordinator',
            birthday: '1955-10-20'
        });
        validator.validate();
        expect(validator.valid).to.equal(false);
        expect(validator.isValid()).to.equal(false);
        expect(validator.response.code).to.equal(400);
    });

    it("should validate values NOK - occupation", function () {
        validator = new Validator({
            name: "John Bow",
            email: 'mail@john.com',
            occupation: 'IT Coordinator00',
            birthday: '1955-10-20'
        });
        validator.validate();
        expect(validator.valid).to.equal(false);
        expect(validator.isValid()).to.equal(false);
        expect(validator.response.code).to.equal(400);
    });

    it("should validate values NOK - birthday", function () {
        validator = new Validator({
            name: "John Bow",
            email: 'mail@john.com',
            occupation: 'IT Coordinator',
            birthday: '195510-20'
        });
        validator.validate();
        expect(validator.valid).to.equal(false);
        expect(validator.isValid()).to.equal(false);
        expect(validator.response.code).to.equal(400);
    });

    it("should validate values NOK - under 18", function () {
        validator = new Validator({
            name: "John Bow",
            email: 'mail@john.com',
            occupation: 'IT Coordinator',
            birthday: '2000-10-20'
        });
        validator.validate();
        expect(validator.valid).to.equal(false);
        expect(validator.isValid()).to.equal(false);
        expect(validator.response.code).to.equal(400);
    });

});