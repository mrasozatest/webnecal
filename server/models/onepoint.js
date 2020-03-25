const mongoose = require('mongoose')
const Schema = mongoose.Schema

let onepointSchema = new Schema({
    body3 : {type : String,require:true},
    x_onepoint : {type : Number,require :true}
});

let onepoint = mongoose.model('onepoint',onepointSchema);
module.exports = onepoint;
