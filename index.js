var express = require('express');
var app = express();
const PORT = 8080;

var bodyParser = require('body-parser');

// EJS template engine
app.set('view engine', 'ejs');
// Serve static files from public dir
app.use(express.static('public'));

// Include all the routes
require('./routes/form')(app);

// Standard error handler
app.use((err, req, res, next) => {
	res.status(500).send('Internal Server Error');
	console.error(err.stack);
});

// Start server
var server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
