'use strict'
let mongoose = require('mongoose');
let User = require('./model/user.js');
let Energy = require('./model/energy.js');

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/energy_dev');

let user = new User({
    account: "admin",
    password: "admin",
    email: "fuckme@173.com",
    phone: "3580449401111",
    address: {"country":"Finland","City":"Tampere","Stree":"Insinoorinkatu 60","building":"Minkontalo",
              "house":"A 188"}
});

user.save(function(err,newuser){
    if(err) console.log(err);
    console.log(JSON.stringify(newuser)+ " inserted into db!");
});

// mongoose.connection.close();