const User = require('../models/user');
const { request, response } = require('express');

const isAdminRole = (req = request, res = response, next)=> {
    uid = req.uid;
    user = req.user;
    if(!user){
        return res.status(500).json({ msg: 'trying to verify the role without the verification token' } );
    }
    const { role, name} = user; 
    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({ 
            msg: `${name} doesn´t have admin role`
        })
    }
    next();
}
//to verify if have any of roles of parameters
const haveRoles = ( ...roles )=>{
//... to transform arguments on array named: roles
    return ( req = request, res = response, next) => {
        if(!req.user){
            return res.status(500).json({ msg: 'trying to verify the role without the verification token' } );
        }
        if( !roles.includes(req.user.role) ){
            return res.status(401).json({ 
                msg: `service require any of these roles: ${roles}`
            })
        }
        next();
    }
}



module.exports= { 
    isAdminRole,
    haveRoles
}