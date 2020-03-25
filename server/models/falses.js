const mongoose = require('mongoose')
const Schema = mongoose.Schema

let falsesSchema = new Schema({
    body2 : {type : String,require:true},
    xl_falses : {type : Number,require :true},
    xr_falses : {type : Number,require :true}
});

let falses = mongoose.model('falses',falsesSchema);
module.exports = falses;
