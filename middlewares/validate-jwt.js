var jwt = require('jsonwebtoken');

const User = require('../models/user');

//usualmente los jwt se mandan en los headers, no como parametros
const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            token,
            msg: 'Token not received'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPUBLIC_KEY);
        req.uid = uid; 
        const user = await User.findById(uid);
        if ( !user ) {
            return res.status(401).json({
                msg: 'invalid token- user not found in db'
            })
        }else{
            req.user = user;
        }

        if (!user.active || !user.role === 'ADMIN_ROLE') {
            return res.status(401).json({
                msg: 'invalid token- user eliminated or without privilege'
            })
        }

        // console.log("payload: ", payload);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "invalid token"
        })
    }
    //find and compare user-token from user-db
    // req.uid = uid;
}
module.exports = {
    validateJWT
}