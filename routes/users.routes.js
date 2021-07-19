
const { Router } = require('express');
const { check } = require('express-validator'); 
const { userGet,
        usersGet,
        usersPut,
        usersPost,
        usersDelete,
        usersPatch } = require('../controllers/users.controllers');
const { validateFields } = require('../middlewares/validate-fields')


const router = Router();

router.get('/', userGet );

router.get('/all', usersGet );

router.put('/:id', usersPut );

router.post('/', [ 
    check('name','el nombre es obligatorio').isEmpty(),
    check('name','el nombre no puede ser un email').not().isEmail(),
    check('email','el email no es valido').isEmail(),
    check('password','el password debe ser de mas de 6 letras').isLength(6),
    // check('role','no es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validateFields
 ], usersPost );

router.delete('/', usersDelete );

router.patch('/', usersPatch );





module.exports = router;