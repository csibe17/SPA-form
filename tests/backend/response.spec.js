var expect = require('chai').expect;
var Response = require('../../models/response');

describe("Test for backend Response model", function () {
    var response;

    beforeEach(function () {
        response = new Response();
    });

    it("should create the object with empty messages", function () {
        expect(response).to.not.be.null;
        expect(response.response).to.deep.equal({messages: []});
        expect(response.hasMessages()).to.equal(false);
    });

    it("verifies the correct message handling", function () {
        response.addMessage({message: "test1", messageType: "info"});
        response.addMessage({message: "test2", messageType: "warning"});
        expect(response.hasMessages()).to.equal(true);
        response.clearMessages();
        expect(response.hasMessages()).to.equal(false);
    });

    it("checks the response code handling", function () {
        response.code = 500;
        expect(response.code).to.equal(500);
    });

    it("should create correct string JSON from response object", function () {
        response.addMessage({message:"test1",messageType:"success"});
        response.code = 200;
        expect(response.create()).to.equal('{"messages":[{"message":"test1","messageType":"success"}],"code":200}');
    });

});