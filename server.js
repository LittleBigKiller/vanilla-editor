var http = require("http")
var path = require("path")
var express = require("express")
var app = express()
const PORT = 3000;

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})