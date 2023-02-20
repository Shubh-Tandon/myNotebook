const dotenv = require("dotenv")
const mongoose = require('mongoose')

dotenv.config({ path : './config.env'});


const mongoURI = process.env.DATABASE;

// mongoose.set('strictQuery', true);


const connectToMongo = async ()=> {
   await mongoose.connect(mongoURI, ()=>{
    console.log('Connected to Mongo Successfully');
})
}

module.exports = connectToMongo;