// reference the http module so we can create a webserver
var express= require("express");
var bodyParser = require("body-parser");
var path = require("path");
var logger = require("morgan");
var db = require("./mongo.js")


var m = new db(process.env.MONGO_CONNECTION)

var app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', function (req, res) {
  res.send('TodoApp API is running');
});

app.param('collectionName', function (req,res,next,collectionName) {
	m.getItems(function (items) {
		req.collection = items
		next()
	})
})

app.get('/collections/:collectionName', function (req, res) {res.send(req.collection)})


app.post('/collections/:collectionName', function (req, res) {
	console.log("Received new data for collection '%s'", req.params.collectionName)
	m.createItems(req.body, function () {
		res.send("New collection received");	
	})
})

app.get('/collections/:collectionName/:itemid', function (req,res) {
	console.log("Requested item " + req.params.itemid + " from collection " + req.params.collectionName)
	var id = parseInt(req.params.itemid)
	var item
	for (var i = 0; i < req.collection.length; i++) {
		if (id === req.collection[i].id) {
			item = req.collection[i]
		}
	} 
	res.send(item)
})

app.put('/collections/:collectionName/:itemid', function (req,res) {
	console.log("Updating item %s from collection '%s'", req.params.itemid, req.params.collectionName)
	m.setItem(req.params.itemid, req.body, function () {
		res.send("Updated item " + req.params.itemid)
	})
})

app.delete('/collections/:collectionName/:itemid', function (req,res) {
	console.log("Deleting item %s from collection '%s'", req.params.itemid , req.params.collectionName)
	m.deleteItem(req.params.itemid, function () { 
			res.send("Deleted item " + req.params.itemid + " from collection ")
	})
})


// connect to Mongo and then launch HTTP server

m.on('connected', function () {
	console.log("Creating HTTP server on %s port %s",process.env.IP ,process.env.PORT);
	app.listen(process.env.PORT);
})
