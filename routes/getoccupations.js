module.exports = function (app) {

    var occupations = require('../models/occupation');

    app.get('/getOccupations', function (req, res) {
        occupations.code = 200;
        res.end(JSON.stringify(occupations));
    });

};
