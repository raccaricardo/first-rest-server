
const { Router } = require('express');
const { check } = require('express-validator');
const { userGet,
    usersGet,
    userPut,
    userPost,
    userDelete,
    // userPatch 
} = require('../controllers/users.controllers');
const { isValidRole, emailExist, userExistById, PasswordIsNull, putEmailExist } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields')


const router = Router();

router.get('/', usersGet);
router.get('/:id', [
    check('id').custom(userExistById),
    validateFields
], userGet);

// router.get('/all', userGet );

router.put('/:id', [
    check('id', 'invalid ID').isMongoId(),
    check('id').custom(userExistById),
    // check('role').custom(isValidRole),
    check('password' ).custom(PasswordIsNull),
    check( 'email' ).custom(putEmailExist),
    validateFields
], userPut);

router.post('/', [
    check('name', 'name is required').notEmpty(),
    check('name', "name can't be an email address").not().isEmail(),
    check('email', 'invalid email').isEmail(),
    check('email', 'email is required').notEmpty(),
    check('email', 'email already in use').custom(emailExist),
    check('password', 'password must be at least 6 charset').isLength(6),
    check('password', 'password is required').notEmpty(),
    check('role').custom(isValidRole),
    check('role', 'role is required').notEmpty(),
    validateFields
], userPost);

router.delete('/:id', [
    check('id', 'invalid ID').isMongoId(),
    check('id').custom(userExistById),
    validateFields
], userDelete );

// router.patch('/', userPatch );





module.exports = router;