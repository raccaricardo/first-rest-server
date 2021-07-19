const bcrypt = require('bcryptjs');

const encryptpass = (pass)=>{
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(pass, salt);
    return hash;
}

module.exports= { encryptpass };