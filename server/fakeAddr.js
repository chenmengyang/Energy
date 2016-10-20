'use strict'
let mongoose = require('mongoose');
let Address = require('./model/address.js');

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/energy_dev');

let addr = new Address({
    name: "Paawola-A",
    country: "FINLAND",
    city: "Tampere",
    street: "whatever 122",
    building:"Paawola",
    block:"A"
    // address: {"country":"Finland","City":"Tampere","Stree":"Insinoorinkatu 60","building":"Minkontalo",
    //           "house":"A 188"}
});

addr.save(function(err,newaddr){
    if(err) console.log(err);
    console.log(JSON.stringify(newaddr)+ " inserted into db!");
});

// mongoose.connection.close();