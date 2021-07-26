const { Router } = require('express');
const { check } = require('express-validator')

const { 
    login, 
    loginGoogle
 } = require('../controllers/auth.controllers');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();


router.post('/login',[
    // validateJWT,
    check('email', 'email is required').notEmpty(),
    check('email', 'invalid email').isEmail(),
    check('password', "password field can\'t be empty").notEmpty(),
    check('password', "password must be at least 6 charset").isLength(6),
    validateFields
],login );
router.post('/login/google', [
    check('id_token', "id_token is required").notEmpty(),
    validateFields
], loginGoogle);

module.exports = router;