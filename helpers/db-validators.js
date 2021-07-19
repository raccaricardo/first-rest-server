const Role = require('../models/role');
const User = require('../models/user');
const isValidRole = async (role = '') => {
    const roleExist = await Role.findOne({ role });
    if (!roleExist) {
        throw new Error("Role doesn't exist ");
    }
}
const emailExist = async (email = '') =>{
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        throw new Error(`email: ${email} already registered`);        
    }
}
const userExistById = async (id = '')=>{
    const userExist = await User.findById( id );
    if( !userExist ) {
        throw new Error(`Id ${id} doesn't exist`);
    }
}
module.exports = { 
    isValidRole,
    emailExist,
    userExistById
}