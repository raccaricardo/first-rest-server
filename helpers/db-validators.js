const Role = require('../models/role');
const User = require('../models/user');
const isValidRole = async (role = '') => {
    const roleExist = await Role.findOne({ role });
    if (!roleExist) {
        throw new Error("Role doesn't exist ");
    }
}
const emailExist = async (email = '') => {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        throw new Error(`email: ${email} already registered`);
    }
}
 
const PasswordIsNull = async (pass = '') => {
    if ((pass !== '') && (pass.length < 6)) {
        throw new Error(`password: must to be at least 6 charset `);
    }

}
const userExistById = async (id = '') => {
    const userExist = await User.findById(id);
    if (!userExist) {
        throw new Error(`Id ${id} doesn't exist`);
    }
}


const putEmailExist = async (email = '') => {
    if ((email !== '')) {
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            throw new Error(`email: ${email} already registered`);
        }
    }

}
module.exports = {
    isValidRole,
    emailExist,
    userExistById,
    PasswordIsNull,
    putEmailExist
}