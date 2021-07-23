var jwt = require('jsonwebtoken');

const generateJWT = (uid = '') =>{
    
    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPUBLIC_KEY,{
            expiresIn: '4h'//expires in 4 hours
        },(err, token) =>{
            if( err ){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        })


    })



}

module.exports = { 
    generateJWT

}