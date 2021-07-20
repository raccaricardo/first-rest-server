
const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
    } catch (err) {
        console.log(err);
        throw new Error('Failed to start db');
    }

}


module.exports = {
    dbConnection
};