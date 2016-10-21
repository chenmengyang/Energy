'use strict'
let mongoose = require('mongoose');
let User = require('./model/user.js');
let Energy = require('./model/energy.js');

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/energy_dev');

User.find({role:"resident"}).
    exec(
        function(err,users){
            return users;
    }).
    then(kk=>{
        // let energy1 = new Energy({
        //     date:"2016-06",
        //     keyword:"heater",
        //     value:Math.round(Math.random()*100)
        // });
        // console.log("ene1:" + energy1);
        // energy1.save(function(err,ene){
        //     if(err) console.log(err);
        //     else console.log(ene + " succeed!");
        // }
        // );
        kk.forEach(uu=>{
            let energy1 = new Energy({
                period:"2016-06",
                type:"heater",
                value:Math.round(Math.random()*100),
                resident:uu._id
            });
            let energy2 = new Energy({
                period:"2016-06",
                type:"water",
                value:Math.round(Math.random()*100),
                resident:uu._id
            });
            let energy3 = new Energy({
                period:"2016-06",
                type:"electricity",
                value:Math.round(Math.random()*100),
                resident:uu._id
            });
            energy1.save();
            energy2.save();
            energy3.save();
        });
    });

// mongoose.connection.close();