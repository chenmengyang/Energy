'use strict';

let express = require('express');
let mongoose = require('mongoose');
let async = require('async');
let app = express();
let User = require('./model/user.js');
let Address = require('./model/address.js');
let Energy = require('./model/energy.js');
let Rule = require('./model/rule.js');
let bodyParser = require('body-parser');
let request = require('request');
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
// app.use('/libs', express.static('node_modules/angular2-highcharts/dist'));
app.use('/@highcharts', express.static('node_modules/highcharts'));
app.use('/@maps', express.static('node_modules/angular2-google-maps/core'));
app.use('/@pagination', express.static('node_modules/ng2-pagination/dist'));

// get the 
app.get('/', function(req, res){
  res.json({"text":"1 suck"});
});

app.get('/login', function(req, res){
  User.find({},function(err,users){
      if(err) res.json(err);
  })
});

app.post('/login', function(req, res){
    User.findOne({account:req.body.account,password:req.body.password})
    .exec(function(err,user){
            if (err) res.send(err);
            if(user!=null)
            {
                res.json({"user":user});
            }
            else
            {
                res.status(400).send('Wrong Account/Password')
            }
        })
});

app.get('/api/address',(req,res)=>{
    Address.find({},(err,addrs)=>{
        if (err) res.send(err);
        res.json(addrs);
    });
});

app.get('/api/address/:aid', (req, res)=>{
    Address.find({_id:req.params.aid}, (err,addr)=>{
        if (err) res.send(err);
        res.json(addr);
    });
});

app.post('/api/address',(req,res)=>{
    var obj = new Address(req.body);
    obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
    });
});

app.put('/api/address/info/:id',(req,res)=>{
    // console.log("body is "+JSON.stringify(req.body)+" id is "+req.params.id);
    // Address.findOneAndUpdate({_id:req.params.id}, req.body, (err)=>{
    //     if (err) return console.error(err);
    //     res.sendStatus(200);
    // });
    Address.findOneAndUpdate({_id:req.params.id},{$push:{info:req.body}},{safe: true, upsert: true},(err,result)=>{
        if (err) console.error(err);
        console.log("result is "+JSON.stringify(result));
        res.sendStatus(200);
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

app.get('/api/janitors/:jid', (req, res)=>{
    User.find({_id:req.params.jid}, (err,janitor)=>{
        if (err) res.send(err);
        res.json(janitor);
    });
});

app.put('/api/janitors/:id', (req, res)=>{
    User.findOneAndUpdate({_id:req.params.id}, req.body, (err)=>{
        if (err) return console.error(err);
        res.sendStatus(200);
    });
});

app.put('/api/janitors/buildings/:id/:buildings?', (req, res)=>{
    let buildings;
    if (req.params.buildings)
    {
        buildings = (req.params.buildings).replace(/\"/g,'').split(",");
    }
    else
    {
        buildings = [];
    }
    // console.log("buildings:"+buildings + " req.params.id:"+req.params.id);
    User.findOneAndUpdate({_id:req.params.id}, {responsibility:buildings}, (err)=>{
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

// Manager apis
app.get('/api/managers',(req,res)=>{
    User.find({role:"manager"},(err,managers)=>{
        if (err) res.send(err);
        res.json(managers);
    });
});

app.get('/api/managers/:mid', (req, res)=>{
    User.find({_id:req.params.mid}, (err,manager)=>{
        if (err) res.send(err);
        res.json(manager);
    });
});

app.post('/api/managers',(req,res)=>{
    var obj = new User(req.body);
    obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
    });
});

app.put('/api/managers/:id', (req, res)=>{
    User.findOneAndUpdate({_id:req.params.id}, req.body, (err)=>{
        if (err) return console.error(err);
        res.sendStatus(200);
    });
});

app.put('/api/managers/buildings/:id/:buildings?', (req, res)=>{
    let buildings;
    if (req.params.buildings)
    {
        buildings = (req.params.buildings).replace(/\"/g,'').split(",");
    }
    else
    {
        buildings = [];
    }
    //
    User.findOneAndUpdate({_id:req.params.id}, {responsibility:buildings}, (err)=>{
        if (err) return console.error(err);
        res.sendStatus(200);
    });
});

app.delete('/api/managers/:id', (req, res)=>{
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

// Rule apis
app.get('/api/rules',(req,res)=>{
    Rule.find({},(err,rules)=>{
        if(err) return console.error(err);
        res.json(rules);
    });
});

app.post('/api/rules',(req,res)=>{
    var obj = new Rule(req.body);
    obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
    });
});

app.put('/api/rules/:id',(req,res)=>{
    Rule.findOneAndUpdate({_id:req.params.id}, req.body, (err)=>{
        if (err) return console.error(err);
        res.sendStatus(200);
    });
});

app.delete('/api/rules/:id', (req, res)=>{
    Rule.findOneAndRemove({_id:req.params.id}, (err)=>{
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

// update energy value or insert if not yet exist
app.put(/^\/api\/energy\/period=([^\/]+)\/building=([^\/]+)\/type=([^\/]+)$/,(req,res)=>{
    let period = req.params[0];
    let building = req.params[1];
    let type = req.params[2];

    Energy.find({period:period,type:type,building:building},(err,result)=>{
        if(err) console.log(err);
        if(result.length)
        {
            Energy.update({period:period,type:type,building:building},{$set:{value:Number(req.body.value)}},(err)=>{
                if (err) return console.error(err);
                res.sendStatus(200);
            });
        }
        else
        {
            let obj = new Energy({
                period:period,
                building:building,
                type:type,
                value:Number(req.body.value)
            });
            obj.save(function(err, obj) {
                if(err) return console.error(err);
                res.status(200).json(obj);
            });
        }
    })
});

app.get(/^\/api\/energy\/time=([^\/]+)\/address=([^\/]+)\/type=([^\/]+)$/,(req,res)=>{
    let time = req.params[0];
    let addr = req.params[1];
    let type = req.params[2];
    let condition;
    if(time==="all")
    {
        condition = {building:addr,type:type}
    }
    else
    {
        condition = {period:time,building:addr,type:type}
    }

    Energy.find(condition,null,{sort: {period: 1}},(err,result)=>{
        if(err) console.log(err);
        res.json(result);
    })
});

app.get(/^\/api\/energy\/time=([^\/]+)\/address=([^\/]+)$/,(req,res)=>{
    let time = req.params[0];
    let addr = req.params[1];
    let tmp_array=addr.split(',');
    let condition;
    // Energy.find({building:{$in:tmp_array}},(err,result)=>{
    //     if (err) res.send(err);
    //     res.json(result);
    // })
    if(time==="all")
    {
        condition = {building:{ $in: tmp_array }};
    }
    else
    {
        condition = {building:{ $in: tmp_array },period:time};
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
                // .populate('resident','account')
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

// mail
app.post('/api/mail',(req,res)=>{
    console.log("req.body is "+ JSON.stringify(req.body));
    request.post("https://script.google.com/macros/s/AKfycbyLRh8L4gWtgDC2zgJkCd4z7OFtyM0Wlv9se-MEzv9iZc2wlO8/exec",
                {form:req.body}, function optionalCallback(err, httpResponse, body) {
                            if (err) {
                                return console.error('send failed:', err);
                            }
                            }
                );
});

app.listen(3000);