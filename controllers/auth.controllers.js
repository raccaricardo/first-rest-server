const { response } = require('express');

const login = (req, res)=>{


    res.json({
        msg: 'Login OK'
    })
}

module.exports = { login}