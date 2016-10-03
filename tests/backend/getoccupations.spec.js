var expect = require('chai').expect;
var getoccupations = require('../../routes/getoccupations');
var occupations = require('../../models/occupation');

describe("Test for backend getoccupations route", function () {
    var app, res;
    var isEnded = false;
    var jsonobj;
    var usedRoute;

    beforeEach(function () {
        res = {
            end: function (json) {
                isEnded = true;
                jsonobj=json;
            }
        };
        app = {
            get: function (route, callback) {
                usedRoute=route;
                callback({}, res);
            }
        };
    });

    it("should check the correct routing", function () {
        getoccupations(app);
        expect(usedRoute).to.equal('/getOccupations');
    });

    it("should check the gathered data", function () {
        getoccupations(app);
        expect(isEnded).to.equal(true);
        expect(occupations.code).to.equal(200);
        expect(jsonobj).to.be.a('string');
        expect(jsonobj).to.deep.equal(JSON.stringify(occupations));
    });
});


