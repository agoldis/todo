// reference the http module so we can create a webserver
var express= require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mng = require("mongoose");
var logger = require("morgan");




var initDb = function () {
	var todoSchema = mng.Schema({
		title: String,
		completed: Boolean
	});
	var Todo = mng.model('Todo', todoSchema);
};

// mng.connect(process.env.MONGO_CONNECTION);
// var db = mng.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {s
// 	console.log('Successfully connected to DB');
// 	initDb();
// });


console.log("Creating HTTP server on " + process.env.IP + ", port " + process.env.PORT);


var app = express()
// app.use(bodyParser)
app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', function (req, res) {
  res.send('TodoApp API is running');
});
app.param('collectionName', function (req,res,next,collectionName) {
	req.collection = [{title: 'item1', completed: false}, { title: 'item2', completed: false }];
	next();
})

app.get('/collections/:collectionName', function (req, res, next) {
	res.send(req.collection)
})



app.listen(process.env.PORT);
