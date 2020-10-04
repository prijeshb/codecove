//@ts-check
"use strict";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs')
var filename='data/todolist.txt';
//var fs = require(fs);
app.use(bodyParser.json());

app.get('/', function (req, res) {
  console.log('/: I received a GET request');
  var readFileCallback = function (err,data) {
    if (err) {
      res.status(500).send({message:'Error in reading the file'});
      return console.log(err);
    }
    console.log(data);
    res.status(200).send(data);
  };
  fs.readFile(filename, 'utf8', readFileCallback);
});
app.post('/', function (req, res) {
  console.log('/: I received a POST request');
  console.log(req.body);
  //res.end({url:'/'});
  
  var readFileCallback = function (err,data) {
    if (err) {
      res.status(500).send({message:'Error in reading the file'});
      return console.log(err);
    }
    console.log(data);
    data+='\n'+req.body.data;
    fs.writeFile(filename, data,(err) => {  
      // throws an error, you could also catch it here
      if (err) throw err;
      res.status(201).send(data);
        //res.json(data);
    });
  };
  //read file then write the post json data
  fs.readFile(filename, 'utf8', readFileCallback);  
});

app.listen(3000);
console.log("Server running on port 3000: \n http://localhost:3000");