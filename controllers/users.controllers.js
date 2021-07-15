const { response, request } = require('express');

  // const id = req.params.id;
  //existen varias formas de obtener datos del req:
  // req.query, req.body, req.params, req.params.nombreparametro

const usersGet = (req = request, res = response) => {

    const { q, name = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        name,
        apikey,
        page, 
        limit
    });
}

const usersPost = (req, res = response) => {

    const { name, edad } = req.body;

    res.json({
        msg: 'post API - usersPost',
        name, 
        edad
    });
}

const usersPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - usersPut',
        id
    });
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usersPatch'
    });
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usersDelete'
    });
}




module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
}

