const mongoose = require('mongoose')
const Schema = mongoose.Schema

let secantsSchema = new Schema({
    body5 : {type : String,require:true},
    x_secants0 : {type : Number,require :true},
    x_secants1 : {type : Number,require :true}
});

let secants = mongoose.model('secants',secantsSchema);
module.exports = secants;
