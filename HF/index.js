var colors = require('colors');
var express = require('express');
var app = express();

app.use(express.static ('build'));
var server = app.listen(3000, function() {
    console.log("listening on localhost:"+"3001".green);
    console.log("It's works".green);
});