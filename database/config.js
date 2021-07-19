
const mongoose = require('mongoose'); 

const dbConnection = async()=>{

    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log("Base de datos online conectada");
    }catch(err){
        console.log(err);
        throw new Error('Error a la hora de iniciar la db');
    }

}



module.exports = {
    dbConnection
};