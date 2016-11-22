var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testSchema = new Schema({
    title : String,
    services : Schema.Types.Mixed,
    rows : Schema.Types.Mixed,
    editable: Boolean,
    index:Schema.Types.Mixed,
    style:String,
    failover:Boolean,
    panel_hints:Boolean,
    loader:Schema.Types.Mixed,
    solr:Schema.Types.Mixed,
    username:String
    // account: { type : String , unique : true, required : true },
    // password: String,
    // email: String,
    // phone: String,
    // role:String,
    // room:String,
    // address: String,
    // responsibility:String
});

module.exports = mongoose.model('Test',testSchema,'test2');