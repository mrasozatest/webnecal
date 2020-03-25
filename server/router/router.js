var express = require('express');
var router = express.Router();
let Bisection = require('../models/bisection');
let False = require('../models/falses');
let Onepoint = require('../models/onepoint');
let Raphson = require('../models/raphsons');
let Secant = require('../models/secants');
/* GET users listing. */

router.get('/bisection', function(req, res, next) {
 
  Bisection.find().exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })
});

router.get('/falses', function(req, res, next) {
 
  False.find().exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })  
});

router.get('/onepoint', function(req, res, next) {
 
  Onepoint.find().exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })  
});

router.get('/raphsons', function(req, res, next) {
 
  Raphson.find().exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })  
});

router.get('/secants', function(req, res, next) {
 
  Secant.find().exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })  
});

router.post('/addbisection',(req,res)=>{
  console.log(req.body);
  let doc = new Bisection(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

router.post('/addfalses',(req,res)=>{
  console.log(req.body);
  let doc = new False(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

router.post('/addonepoint',(req,res)=>{
  console.log(req.body);
  let doc = new Onepoint(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

router.post('/addraphsons',(req,res)=>{
  console.log(req.body);
  let doc = new Raphson(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

router.post('/addsecants',(req,res)=>{
  console.log(req.body);
  let doc = new Secant(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

module.exports = router;
