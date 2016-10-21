'use strict'
let mongoose = require('mongoose');
let User = require('./model/user.js');
let Energy = require('./model/energy.js');
let Address = require('./model/address.js');
var async = require('async');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/energy_dev');

// User.find({address:"Mikontalo-A"})
// .populate('_id')
// .exec((err,result)=>{
//     console.log(result._id.period);
// })

// let tmp_arr = [];
// async.waterfall([
//     (callback)=>{
//         User.find({role:{ $in: ['admin','resident'] }})
//             .exec((err,result)=>{
//                 result.forEach((e)=>{
//                     tmp_arr.push(e._id);
//                 });
//                 callback(null);
//         })
//     },
//     (callback)=>{
//         console.log("tmp_arr:"+tmp_arr);
//         Energy.find({resident:{ $in: tmp_arr }})
//             .exec((err,result)=>{
//                 console.log("result:"+result);
//                 callback(null);
//         })
//     }
// ]
// );

// async.waterfall([
//     (callback)=>{console.log("len:"+t.length);t.push(1);callback(null);},
//     (callback)=>{console.log("len:"+t.length);callback(null);},
//     (callback)=>{console.log("fuck");callback(null);}
// ])

Energy.find({type:"water"})
.sort('period')
.populate('resident','account')
.exec((err,result)=>{
    console.log(result);
});