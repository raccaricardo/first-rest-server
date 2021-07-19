const { response, request } = require("express");
const { body, validationResult } = require('express-validator');



const User = require("../models/user");
const { encryptpass } = require("../helpers/encrypt");



const userGet = (req = request, res = response) => {
  const { q, name = "No name", apikey, page = 1, limit } = req.query;
  res.json({
    msg: "get API - controlador",
    q,
    name,
    apikey,
    page,
    limit,
  });
};

const usersPost = async (req = request, res = response) => {
 
  const body = req.body;
  /**
   * const { address2, ...restantParameters} = req.body;
   * const user = new User(restantParameters);//registra todos los parametros excepto address2
   */
  const {
    name,
    email,
    password,
    img = "",
    rol = "USER_ROLE",
    active = true,
    google = false,
  } = body;
  const user = new User({ name, email, password, img, rol, active, google });
  //verif if email exist
  const emailExist = await user.findOne({ email });
  if( emailExist ){
    return res.status(400).json({
      msg:'El correo ya se encuentra registrado'
    })
  }
  // encrypt password
  const pass = await encryptpass(user.password);
  user.password = pass;
  console.log("password encriptada:", pass);
  //save in db
  await user.save();
  res.json({
    msg: "post API - usersPost",
    name,
    email,
  });
};

// const usersPut = (req, res = response) => {
//   const { id } = req.params;

//   res.json({
//     msg: "put API - usersPut",
//     id,
//   });
// };

// const usersPatch = (req, res = response) => {
//   res.json({
//     msg: "patch API - usersPatch",
//   });
// };

// const usersDelete = (req, res = response) => {
//   res.json({
//     msg: "delete API - usersDelete",
//   });
// };

module.exports = {
  userGet,
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};
