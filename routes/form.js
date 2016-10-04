module.exports = function (app) {

    var occupations = require('../models/occupation');
    var messages = require('../models/messages');

    app.get('/', function (req, res) {
        res.redirect("/fillForm");
    });

    app.get('/fillForm', function (req, res) {
        res.render('form', {
            shownMessages: [messages.welcome],
            occupations: occupations.occupations
        });
    });

};
