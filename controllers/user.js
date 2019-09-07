const User = require('../models/user');
const redisAsync = require('../helper/redis')();
const {Client} = require('pg');

const client = new Client(
{
user:'me',
host:'postgresDB',
database:'crudapi',
password:'abc',
port:5432
})


const createUser = async (req, res) => {
    try {
        var requestData = req.body;
        var newUser = new User(req.body);
        console.log(req.body);
        let _newUser = await newUser.save();
        let setSocketInRedis = await redisAsync.set(`USER:${_newUser._id.toString()}`,JSON.stringify(newUser.name)) 
        res.status(200).json(_newUser);
    } catch (error) {
        res.status(400).json(error);
    }
};

const listUser = async (req, res) => {
    try {
        let _newUser = await User.find({});
        res.status(200).json(_newUser);
    } catch (error) {
        res.status(400).json(error);
    }
};

const getUser = async (req, res) => {
    try {
        let userID = req.params.id;
        let userData = await redisAsync.get(`USER:${userID}`);
        console.log('Redis Data ====>>',userData);
        let _newUser = await User.find({_id:userID});
        res.status(200).json(_newUser);
    } catch (error) {
        res.status(400).json(error);
    }
};



// postgress queries

const getUsers = async (request,response)=>{
    try{
        console.log("get user func");
        const res =  await client.query('SELECT * FROM users ORDER BY id ASC');
        console.log('response',res);
        response.send(res.rows);
        client.end();
    }	
    catch(error){
        console.log(error);
        response.status(400).json(error);
        client.end();

    }
    };
    
    
    const addUser = async (request,response)=>{
    try{
        const{name,email}=request.body;
        console.log("create user func",name,email);
        const res =  await client.query('INSERT INTO users(name.email) VALUES ($1,$2)',[name,email]);
        console.log('response',res);
        response.status(200).send(res); 
    }	
    catch(error){
        console.log(error);
        response.status(400).json(error);
    }
    };
    
    const updateUser = async (request,response)=>{
    try{
        const id = parseInt(request.params.id);
        console.log("id to update",id);
        const{name,email}=request.body;
        console.log("create user func");
        const res =  await client.query('UPDATE users SET name=$1,email=$2 WHERE id=$3,[name,email,id]');
        console.log('response',res);
        response.status(200).send(res); 
    }	
    catch(error){
        console.log(error);
        response.status(400).json(error);
    }
    };

module.exports = {
    createUser,
    listUser,
    getUsers,
	addUser,
    updateUser,
    getUser

}