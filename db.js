const mongoose = require('mongoose');
const MONGO_DB='test'
  
console.log(process.env.MONGO_USERNAME)
const url = `mongodb://mongo:27017/${MONGO_DB}` 
// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongo:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
const options = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500, 
    connectTimeoutMS: 10000,
  };
mongoose.connect(url, options).then( function() {
    console.log('MongoDB is connected');
  })
    .catch( function(err) {
    console.log(err);
  });
  