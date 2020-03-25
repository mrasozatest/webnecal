const mongoose = require('mongoose')
const Schema = mongoose.Schema

let raphsonsSchema = new Schema({
    body4 : {type : String,require:true},
    x_raphsons : {type : Number,require :true}
});

let raphsons = mongoose.model('raphsons',raphsonsSchema);
module.exports = raphsons;
