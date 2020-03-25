const mongoose = require('mongoose');
const config = {
    autoIndex: true,
    useNewUrlParser: true,
};
const connect = 'mongodb+srv://dbUser:x0986684393@cluster0-6o3lv.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(connect,config)
.then(()=> console.log('connect database...'))
.catch(err =>console.log('can not connect database cos --->>>',err))

const express = require('express')
const bodyParser = require('body-parser')
var path = require('path');
const apiPort = 4000

mongoose.Promise = global.Promise;

var Router = require('./router/router');


const app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
    origin:3000,
    optionsSuccessStatus:200,
    methods:['POST','GET','PUT','DELETE']
  }));
  
  app.use('/api/users', Router);
  
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  })
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))