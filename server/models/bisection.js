
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let bisectionsSchema = new Schema({
    body1 : {type : String,require:true},
    xl_bisections : {type : Number,require :true},
    xr_bisections : {type : Number,require :true}
});

let Bisection = mongoose.model('bisections',bisectionsSchema);
module.exports = Bisection;
