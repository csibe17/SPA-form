var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const PORT = 8080;

// EJS template engine
app.set('view engine', 'ejs');
// Serve static files from public dir
app.use(express.static('public'));

// Set bodyparser
app.use(bodyParser.json());

// Include all the routes
require('./routes/form')(app);
require('./routes/adduser')(app);

// Standard error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	if(!err.status){
		res.sendStatus(500);//.send('Internal Server Error');
	}
	else{
		res.sendStatus(err.status);
	}
});

// Start server
var server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
