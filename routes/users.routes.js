
const { Router } = require('express');

const { usersGet,
        usersPut,
        usersPost,
        usersDelete,
        usersPatch } = require('../controllers/users.controllers');

const router = Router();


router.get('/', usersGet );

router.put('/:id', usersPut );

router.post('/', usersPost );

router.delete('/', usersDelete );

router.patch('/', usersPatch );





module.exports = router;