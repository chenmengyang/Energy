'use strict'
let mongoose = require('mongoose');
let User = require('./model/user.js');
let Energy = require('./model/energy.js');

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:12345/energy_dev');

User.find({}).
    exec(
        function(err,users){
            return users;
    }).
    then(kk=>{
        // let energy1 = new Energy({
        //     date:"10-2016",
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
                date:"10-2016",
                keyword:"heater",
                value:Math.round(Math.random()*100),
                user:uu._id
            });
            let energy2 = new Energy({
                date:"10-2016",
                keyword:"water",
                value:Math.round(Math.random()*100),
                user:uu._id
            });
            let energy3 = new Energy({
                date:"10-2016",
                keyword:"electricity",
                value:Math.round(Math.random()*100),
                user:uu._id
            });
            energy1.save();
            energy2.save();
            energy3.save();
        });
    });

// mongoose.connection.close();