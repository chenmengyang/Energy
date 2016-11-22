'use strict'
let mongoose = require('mongoose');
let User = require('./model/user.js');
let Energy = require('./model/energy.js');
let Address = require('./model/address.js');
let Test2 = require('./model/test1.js');
var async = require('async');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/zetta');

let t2 = new Test2({"title":"New Time Series Dashboard","services":{"query":{"idQueue":[1,2,3,4],"list":{"0":{"query":"*:*","alias":"","color":"#7EB26D","id":0,"pin":false,"type":"lucene"}},"ids":[0]},"filter":{"idQueue":[1,2],"list":{"0":{"from":"NOW/MINUTE-15MINUTE","to":"NOW/MINUTE%2B1MINUTE","field":"ts_dt","type":"time","fromDateObj":"2016-11-01T16:04:01.281Z","toDateObj":"2016-11-01T16:19:01.282Z","mandate":"must","active":true,"alias":"","id":0}},"ids":[0]}},"rows":[{"title":"Query and Time Window","height":"50px","editable":true,"collapse":false,"collapsable":true,"panels":[{"error":"","span":5,"editable":true,"type":"timepicker","loadingEditor":false,"status":"Stable","mode":"relative","time_options":["5m","15m","1h","6h","12h","24h","7d","30d","90d","1y","5y"],"timespan":"15m","timefield":"ts_dt","timeformat":"","refresh":{"enable":false,"interval":30,"min":3},"filter_id":0,"spyable":true,"title":"Time Window"},{"error":false,"span":4,"editable":true,"group":["default"],"type":"query","label":"Search","history":[],"remember":10,"pinned":true,"query":"*:*","title":"Search","spyable":true,"def_type":""},{"span":3,"editable":true,"type":"hits","loadingEditor":false,"queries":{"mode":"all","ids":[0],"query":"q=*%3A*&fq=ts_dt:[NOW/MINUTE-15MINUTE%20TO%20NOW/MINUTE%2B1MINUTE]&stats=true&stats.field=id&wt=json&rows=0\n","basic_query":"","custom":""},"style":{"font-size":"14pt"},"arrangement":"horizontal","chart":"total","counter_pos":"above","donut":false,"tilt":false,"labels":true,"spyable":true,"title":"Total Hits","show_queries":true,"metrics":[{"type":"count","field":"id","decimalDigits":0,"label":"","value":"0"}],"refresh":{"enable":false,"interval":2}}]},{"title":"Filters","height":"50px","editable":true,"collapse":false,"collapsable":true,"panels":[{"error":false,"span":12,"editable":true,"spyable":true,"group":["default"],"type":"filtering"}]},{"title":"Graph","height":"250px","editable":true,"collapse":false,"collapsable":true,"panels":[{"span":12,"editable":true,"type":"histogram","loadingEditor":false,"mode":"count","time_field":"ts_dt","queries":{"mode":"all","ids":[0],"query":"q=*%3A*&wt=json&rows=0&fq=ts_dt:[NOW/MINUTE-15MINUTE%20TO%20NOW/MINUTE%2B1MINUTE]&facet=true&facet.range=ts_dt&facet.range.start=NOW/MINUTE-15MINUTE&facet.range.end=NOW/MINUTE%2B1MINUTE&facet.range.gap=%2B10SECOND\n","custom":""},"max_rows":100000,"value_field":null,"group_field":null,"auto_int":true,"resolution":100,"interval":"10s","intervals":["auto","1s","1m","5m","10m","30m","1h","3h","12h","1d","1w","1M","1y"],"fill":0,"linewidth":3,"timezone":"browser","spyable":true,"zoomlinks":true,"bars":true,"stack":true,"points":false,"lines":false,"legend":true,"x-axis":true,"y-axis":true,"percentage":false,"interactive":true,"options":true,"tooltip":{"value_type":"cumulative","query_as_alias":false},"title":"Event Counts","lines_smooth":false,"sum_value":false,"show_queries":true,"refresh":{"enable":false,"interval":2}}]},{"title":"Table","height":"150px","editable":true,"collapse":false,"collapsable":true,"panels":[{"span":12,"editable":true,"type":"table","loadingEditor":false,"status":"Stable","queries":{"mode":"all","ids":[0],"query":"q=*%3A*&fq=ts_dt:[NOW/MINUTE-15MINUTE%20TO%20NOW/MINUTE%2B1MINUTE]&wt=json&rows=500","basic_query":"q=*%3A*&fq=ts_dt:[NOW/MINUTE-15MINUTE%20TO%20NOW/MINUTE%2B1MINUTE]","custom":""},"size":100,"pages":5,"offset":0,"sort":[],"group":"default","style":{"font-size":"9pt"},"overflow":"min-height","fields":[],"highlight":[],"sortable":false,"header":true,"paging":true,"field_list":true,"trimFactor":300,"normTimes":true,"spyable":true,"saveOption":"json","exportSize":500,"exportAll":true,"displayLinkIcon":true,"imageFields":[],"imgFieldWidth":"auto","imgFieldHeight":"85px","title":"Table panel","important_fields":["Loghost_s","_text_","_version_","application_s","eventMsg_s","id","lineValue_s","process_s","ts_dt"],"show_queries":true,"maxNumCalcTopFields":20,"calcTopFieldValuesFromAllData":false,"refresh":{"enable":false,"interval":2}}]}],"editable":true,"index":{"interval":"none","pattern":"[logstash-]YYYY.MM.DD","default":"_all"},"style":"light","failover":false,"panel_hints":true,"loader":{"save_gist":false,"save_elasticsearch":true,"save_local":true,"save_default":true,"save_temp":true,"save_temp_ttl_enable":true,"save_temp_ttl":"30d","load_gist":true,"load_elasticsearch":true,"load_elasticsearch_size":20,"load_local":true,"hide":false,"dropdown_collections":false,"save_as_public":false},"solr":{"server":"/solr/","core_name":"test3","core_list":["gettingstarted_shard1_replica2","gettingstarted_shard2_replica2","test1_shard1_replica1","test_shard1_replica1","wiki_shard1_replica1"],"global_params":""},"username":"guest"}
);

t2.save((err,res)=>{
    if(err) console.log(err);
    console.log(res);
});

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

// Energy.find({type:"water"})
// .sort('period')
// .populate('resident','account')
// .exec((err,result)=>{
//     console.log(result);
// });