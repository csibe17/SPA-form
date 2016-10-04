var expect = require('chai').expect;
var adduser = require('../../routes/adduser');

describe("Test for backend adduser route", function () {
    var app, res, req;
    var hasSentStatus = false;
    var hasEnded = false;
    var endobj = {};
    var postRoute;
    var gotCode;

    beforeEach(function () {
        res = {
            sendStatus: function (code) {
                hasSentStatus = true;
                gotCode = code;
            },
            end: function (obj) {
                hasEnded = true;
                endobj = obj;
            }
        };
        req = {};
        app = {
            post: function (route, callback) {
                postRoute = route;
                callback(req, res);
            }
        };
    });

    it("should check the correct routing", function () {
        adduser(app);
        expect(postRoute).to.equal('/addUser');
    });

    it("should check response for empty input", function () {
        adduser(app);
        expect(hasSentStatus).to.equal(true);
        expect(gotCode).to.equal(400);
    });

    it("should check response for valid input", function () {
        req = {body: {test: "test"}};
        adduser(app);
        expect(hasEnded).to.equal(true);
        expect(endobj).to.not.empty;
    });

});
