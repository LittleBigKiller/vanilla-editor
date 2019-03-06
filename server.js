var http = require("http")
var path = require("path")
var express = require("express")
var bodyParser = require("body-parser")
var app = express()
const PORT = 5500;

var level = null

app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

app.post('/SEND-LVL', function(req, res){
    console.log('-----------------------------------------------------')
    level = req.body.level
    console.log(level)
})