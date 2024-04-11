'use strict'

const mongoose = require('mongoose');

const connectionString = `mongodb+srv://vuong:vuong2002@cluster0.v6ua8ov.mongodb.net/`;

mongoose.connect(connectionString).then(_ =>{
    console.log('Connected mongoDB successfully');
}).catch(err => {
    console.log(`Error connecting::${err.message}`);
})

//dev
if(1 === 1 ){
    mongoose.set('debug', true);
    mongoose.set('debug', {color: true});
}

module.exports = mongoose