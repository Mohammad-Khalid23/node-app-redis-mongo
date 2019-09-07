const express = require('express');
const app = express();
const router = express.Router();
const db = require('./db');
const bodyParser = require('body-parser')
const path = __dirname + '/views/';
const port = 3000;
const user = require('./routes/user');
const dotenv = require('dotenv');
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }))
  

// parse application/json
app.use(bodyParser.json())


router.use(function (req,res,next) {
    console.log('/' + req.method);
    next();
  });
  
  router.get('/', function(req,res){
    res.send('Hello this is Khalid Ayub');
  });

app.use(express.static(path));
app.use('/', router);
app.use('/user',user);

app.listen(port, function () {
  console.log('Example app listening on port! '+port)
})