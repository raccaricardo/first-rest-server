const { Schema, model } = require('mongoose');

const roleSchema = Schema({

    role: {
        type: String,
        required: [true, 'role is required']
    }

})


module.exports = model('Role', roleSchema);