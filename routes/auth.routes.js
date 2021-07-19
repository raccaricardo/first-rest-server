const { Router } = require('express');
const { check } = require('express-validator');   


const { login } = require('../controllers/auth.controllers')

const router = Router();

router.post('/login',{
    // check('correo', 'El correo es obligatorio').isEmail();
    
} ,login );

module.exports = router;