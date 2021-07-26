const { response, request } = require("express");
const bcrypt = require('bcryptjs');



const User = require("../models/user");
const { encryptpass } = require("../helpers/encrypt");



const userGet = async (req = request, res = response) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({
    user
  });
};
const usersGet = async (req = request, res = response) => {
  let { limit = 5, from = 0 } = req.query;

  (isNaN(limit)) ? limit = 10 : true;
  (isNaN(from)) ? from = 0 : true;
  // const users = await User.find()
  const query = { active: true };
  const resp = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(Number(from))
      .limit(Number(limit))
  ])
  const [totalUsers, users] = resp;
  res.json({
    totalUsers,
    users

  });
};
const userPost = async (req = request, res = response) => {

  /**
   * const { address2, ...restantParameters} = req.body;
   * const user = new User(restantParameters);
   */
  const {
    name,
    email,
    password,
    img = "",
    role = "USER_ROLE",
    active = true,
    google = false,
  } = req.body;
  const user = new User({ name, email, password, img, role, active, google });
  // encrypt password
  const pass = await encryptpass(user.password);
  user.password = pass;
  //save in db
  await user.save();


  res.json({
    user
  });
};

const userPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, google, role, ...remains } = req.body; //registra todos los parametros excepto address2
  //google no se actualiza porque lo extraemos de remains
  //TODO validate db 
  if (remains.password) {

    
    remains.password = encryptpass(password) ;
  }

  for (var property in remains) {
    if (remains[property] == "" || remains[property] == undefined) {
      delete remains[property]; //eliminamos solo las claves vacias
  }
  }
  const user = await User.findByIdAndUpdate(id, remains);
  delete remains.password;
  res.json({
    remains
  });
};

const userDelete = async (req = request, res = response) => {

  /*delete from db by id
    const user = await User.findByIdAndDelete(id);
    */
  //change state of user to active = false

  const { id } = req.params;
  const uid = req.uid;

  const autenticatedUser = req.user;


  
  // const uid = req.uid;//from middlewares we can receive through req.something
  
  const user = await User.findByIdAndUpdate(id, { active: false });
  

  res.json({
    msg: "user Deleted",
    user,
    uid,
    autenticatedUser
  });
};

module.exports = {
  userGet,
  usersGet,
  userPost,
  userPut,
  userDelete,
};
