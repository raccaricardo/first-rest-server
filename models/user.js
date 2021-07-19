
const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']

    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    active:{
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean, 
        default: false
    }
})

userSchema.methods.toJSON = function(){
    const { __v, password, ...user } = this.toObject();
    return user;
}
module.exports = model( 'User', userSchema ); 