'use strict'
let mongoose = require('mongoose');
let User = require('./model/user.js');
let Energy = require('./model/energy.js');

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:12345/energy_dev');

for(let i=0;i<10;i++)
{
    let user = new User({
        account:"user"+i,
        password:"123456",
        email:"fuckme@173.com",
        phone:"3580449401111"
    });

    user.save(function(err,newuser){
        if(err) console.log(err);
        console.log(JSON.stringify(newuser)+ " inserted into db!");
    });
}

// mongoose.connection.close();