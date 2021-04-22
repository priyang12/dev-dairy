const mongoose = require('mongoose');
const config = require('../node_modules/config');
const db = config.get('mongoURI');
const connectDB = async () => {
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true ,
            useFindAndModify: false
        });
        console.log(' DB connected')
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    } 
}

module.exports = connectDB;