'use strict';

let express = require('express');
let mongoose = require('mongoose');
let async = require('async');
let app = express();
let User = require('./model/user.js');
let Address = require('./model/address.js');
let Energy = require('./model/energy.js');
let bodyParser = require('body-parser');
// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/energy_dev');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));
app.use('/libs', express.static('node_modules/bootstrap/dist'));
app.use('/libs', express.static('node_modules/bootstrap/dist/js'));
app.use('/libs', express.static('node_modules/jquery/dist'));
app.use('/libs', express.static('node_modules/systemjs/dist'));
app.use('/@angular', express.static('node_modules/@angular'));
app.use('/libs', express.static('node_modules/rxjs'));
app.use('/libs', express.static('node_modules/core-js/client'));
app.use('/libs', express.static('node_modules/zone.js/dist'));
app.use('/libs', express.static('node_modules/reflect-metadata'));
app.use('/libs', express.static('node_modules/angular2-highcharts'));
app.use('/libs', express.static('node_modules/angular2-highcharts/node_modules/highcharts'));
app.use('/@maps', express.static('node_modules/angular2-google-maps/core'));

// get the 
app.get('/', function(req, res){
  res.json({"text":"1 suck"});
});

app.get('/login', function(req, res){
  User.find({},function(err,users){
      if(err) res.json(err);
    //   console.log("a:"+users);
    //   res.send({"data":users});
  })
});

app.post('/login', function(req, res){
    // console.log("receiving req: "+JSON.stringify(req.body));
    // console.log("receiving post account:"+ JSON.stringify(req.account) + " password:" + req.password);
    User.findOne({account:req.body.account,password:req.body.password})
    .exec(function(err,user){
            if (err) res.send(err);
            if(user!=null)
            {
                res.json({"user":user});
            }
            else
            {
                // res.json({"login":"failed"});
                res.status(400).send('Wrong Account/Password')
            }
        })
});

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/api/address',(req,res)=>{
    Address.find({},(err,addrs)=>{
        if (err) res.send(err);
        res.json(addrs);
    });
});

app.post('/api/address',(req,res)=>{
    var obj = new Address(req.body);
    obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
    });
});

app.put('/api/address/:id', (req, res)=>{
    Address.findOneAndUpdate({_id:req.params.id}, req.body, (err)=>{
        if (err) return console.error(err);
        res.sendStatus(200);
    });
});

app.delete('/api/address/:id', (req, res)=>{
    Address.findOneAndRemove({_id:req.params.id}, (err)=>{
        if (err) return console.error(err);
        res.sendStatus(200);
    });
});

// Janitor apis 
app.get('/api/janitors',(req,res)=>{
    User.find({role:"janitor"},(err,janitors)=>{
        if (err) res.send(err);
        res.json(janitors);
    });
});

app.post('/api/janitors',(req,res)=>{
    var obj = new User(req.body);
    obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
    });
});

app.put('/api/janitors/:id', (req, res)=>{
    User.findOneAndUpdate({_id:req.params.id}, req.body, (err)=>{
        if (err) return console.error(err);
        res.sendStatus(200);
    });
});

app.delete('/api/janitors/:id', (req, res)=>{
    User.findOneAndRemove({_id:req.params.id}, (err)=>{
        if (err) return console.error(err);
        res.sendStatus(200);
    });
});

// Resident apis 
app.get('/api/residents',(req,res)=>{
    User.find({role:"resident"},(err,residents)=>{
        if (err) res.send(err);
        res.json(residents);
    });
});

app.get('/api/residents/:id', (req, res)=>{
    User.find({_id:req.params.id}, (err,resident)=>{
        if (err) return console.error(err);
        res.json(resident);
    });
});

app.post('/api/residents',(req,res)=>{
    var obj = new User(req.body);
    obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
    });
});

app.put('/api/residents/:id', (req, res)=>{
    User.findOneAndUpdate({_id:req.params.id}, req.body, (err)=>{
        if (err) return console.error(err);
        res.sendStatus(200);
    });
});

app.delete('/api/residents/:id', (req, res)=>{
    User.findOneAndRemove({_id:req.params.id}, (err)=>{
        if (err) return console.error(err);
        res.sendStatus(200);
    });
});

// Energy apis 
app.get(/^\/api\/energy\/time=([^\/]+)\/resident=([^\/]+)$/,(req,res)=>{
    let time = req.params[0];
    let resid = req.params[1];
    let condition;
    if(time==="all")
    {
        condition = {resident:resid};
    }
    else
    {
        condition = {resident:resid,period:time};
    }
    Energy.find(condition)
        .sort('period')
        .populate('resident','account')
        .exec((err,result)=>
          {
            if (err) res.send(err);
            res.json(result);
          });
});

app.get(/^\/api\/energy\/time=([^\/]+)\/address=([^\/]+)$/,(req,res)=>{
    let time = req.params[0];
    let addr = req.params[1];
    let tmp_array=[];
    let condition;
    if(time==="all")
    {
        condition = {resident:{ $in: tmp_array }};
    }
    else
    {
        condition = {resident:{ $in: tmp_array },period:time};
    }
    async.waterfall([
        (callback)=>{
            User.find({address:addr})
                .exec((err,result)=>{
                    result.forEach((e)=>{
                        tmp_array.push(e._id);
                    });
                    callback(null);
            });
        },
        (callback)=>{
            Energy.find(condition)
                .populate('resident','account')
                .exec((err,result)=>{
                    // console.log("result:"+result);
                    res.json(result);
                    callback(null);
            });
        }
    ]);
});

app.post('/api/energy',(req,res)=>{
    var obj = new Energy(req.body);
    obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
    });
});

app.put('/api/energy/:id', (req, res)=>{
    Energy.findOneAndUpdate({_id:req.params.id}, req.body, (err)=>{
        if (err) return console.error(err);
        res.sendStatus(200);
    });
});

app.delete('/api/energy/:id', (req, res)=>{
    Energy.findOneAndRemove({_id:req.params.id}, (err)=>{
        if (err) return console.error(err);
        res.sendStatus(200);
    });
});

app.listen(3000);