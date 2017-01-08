var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ruleSchema = new Schema({
    type:String,
    level:String,
    threshold:Number
});

ruleSchema.index({type: 1, level: 1}, { unique: true });

module.exports = mongoose.model('Rule',ruleSchema,'rule');