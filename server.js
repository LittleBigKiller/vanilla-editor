var http = require("http")
var path = require("path")
var express = require("express")
var bodyParser = require("body-parser")
var app = express()
const PORT = 5500;

var saved = []
var counter = 0
const defaultLevel = {size: '2', level: [{"id": 0, "x": 0, "z": 0, "dirOut": 2, "dirIn": -1, "type": "wall"}, {"id": 1, "x": 0, "z": 1, "dirOut": 3, "dirIn": 5, "type": "enemy"}, {"id": 3, "x": 1, "z": 1, "dirOut": 5, "dirIn": 0, "type": "treasure"}, {"id": 2, "x": 1, "z": 0, "dirOut": 2, "dirIn": 2, "type": "light"} ]}

app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

app.post('/SEND-LVL', function (req, res) {
    console.log('recieved level data')
    saved.push(req.body)
    console.log(saved)
    counter += 1
    if (counter >= saved.length) counter = 0
})

app.post('/LOAD-LVL', function (req, res) {
    if (saved[counter] == undefined) {
        res.send({size: "2", level: []})

        console.log('couldn\'t find level data')
    } else {
        counter += 1
        if (counter >= saved.length) counter = 0

        res.send(saved[counter])

        console.log('send editor data of Id: ' + counter)
    }
})

<<<<<<< HEAD
app.post('/LOAD-LVL-3D', function (req, res) {
    console.log(req.body)
    let id = parseInt(req.body.id)
    if (saved[id] == undefined) {
        res.send(defaultLevel)
=======
app.post('/LOAD-LVL-3D', function(req, res){
    console.log(req.body)
    let id = parseInt(req.body.id)
    if (saved[id] == undefined) {
        res.send({size: '2', level: []})
>>>>>>> 9dcde3a224e306ceb6096a6ecdc4752c5266fa06

        console.log('couldn\'t find level data of Id: ' + id)
    } else {
        res.send(saved[id])

        console.log('send editor data of Id: ' + id)
    }
})

app.get('/game', function (req, res) {
    res.sendFile(__dirname + '/static/game.html')
})