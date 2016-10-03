var expect = require('chai').expect;
var form = require('../../routes/form');
var occupations = require('../../models/occupation');
var messages = require('../../models/messages');

describe("Test for backend form route", function () {
    var app, res;
    var isRedirected = false;
    var isRendered = false;
    var msgobj = {};
    var newRoute;

    beforeEach(function () {
        res = {
            redirect: function (route) {
                isRedirected = true;
                newRoute = route;
            },
            render: function (template, obj) {
                isRendered = true;
                msgobj = obj;
            }
        };
        app = {
            get: function (route, callback) {
                callback({}, res);
            }
        };
    });

    it("should check the redirection", function () {
        form(app);
        expect(isRedirected).to.equal(true);
        expect(newRoute).to.equal('/fillForm');
    });

    it("should check the rendering", function () {
        form(app);
        expect(isRendered).to.equal(true);
    });

    it("should check the rendered object", function () {
        form(app);
        expect(isRendered).to.equal(true);
        expect(msgobj).to.deep.equal({
            shownMessages: [messages.welcome],
            occupations: occupations.occupations
        });
    });

});
