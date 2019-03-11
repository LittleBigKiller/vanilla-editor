var http = require("http")
var path = require("path")
var express = require("express")
var bodyParser = require("body-parser")
var app = express()
const PORT = 5500;

var saved = { size: "2"}

app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

app.post('/SEND-LVL', function(req, res){
    console.log('-----------------------------------------------------')
    saved = req.body
    console.log(saved)
})

app.post('/LOAD-LVL', function(req, res){
    console.log('-----------------------------------------------------')
    res.send(saved)
    console.log('sent level data')
})