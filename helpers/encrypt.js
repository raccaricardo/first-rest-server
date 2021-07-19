const bcrypt = require('bcryptjs');

const encryptpass = (pass)=>{
    salt = bcrypt.genSaltSync();
    hash = bcrypt.hashSync(pass, salt);
    return hash;
}

module.exports= { encryptpass };