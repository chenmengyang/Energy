'use strict';

let express = require('express');
let mongoose = require('mongoose');
let app = express();
let User = require('./model/user.js');
let Energy = require('./model/energy.js');
let bodyParser = require('body-parser');
// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:12345/energy_dev');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// get the 
app.get('/', function(req, res){
  res.send('fucking world!');
});

app.get('/login', function(req, res){
  User.find({},function(err,users){
      if(err) res.json(err);
      res.send({"data":users});
  })
});

app.post('/login', function(req, res){
    console.log("receiving req: "+req.body);
    // console.log("receiving post account:"+ JSON.stringify(req.account) + " password:" + req.password);
  User.findOne({account:req.body.account,password:req.body.password})
    .exec(function(err,user){
        if (err) res.send(err);
        if(user!=null)
        {
            res.json({"login":"succeed"});
        }
        else
        {
            res.json({"login":"failed"});
        }
    })
});

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);
