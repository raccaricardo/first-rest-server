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

  ( isNaN( limit ) ) ? limit = 10 : true;
  ( isNaN( from ) ) ? from = 0 : true;
  // const users = await User.find()
  const query = { active: true };    
  const resp = await Promise.all([
    User.countDocuments(query),
    User.find( query )
      .skip( Number( from ) )
      .limit( Number( limit ) )    
  ])
  const [totalUsers, users] = resp  ;
  res.json({
    totalUsers, 
    users
    
  });
};
const userPost = async (req = request, res = response) => {
 
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
    role = "USER_ROLE",
    active = true,
    google = false,
  } = body;
  const user = new User({ name, email, password, img, role, active, google });
  //verif if email exist
  // encrypt password
  const pass = await encryptpass(user.password);
  user.password = pass;
  console.log("password encriptada:", pass);
  //save in db
  await user.save();


  res.json({
    user
  });
};

const userPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, ...remains } = req.body; //google no se actualiza porque lo extraemos de remains
  //TODO validate db 
  if(password){
   
    const salt = bcrypt.genSaltSync();  
    remains.password = bcrypt.hashSync(password, salt);
    console.log(` password: ${password} password encriptada:${remains.password}`);
  }
    const user = await User.findByIdAndUpdate(id, remains);
    console.log(user);
    delete remains.password;
  res.json({
    remains
  });
};

// const userPatch = (req, res = response) => {
//   res.json({
//     msg: "patch API - userPatch",
//   });
// };

const userDelete = async (req = request, res = response) => {
  
  const { id } = req.params;
  /*delete from id
  const user = await User.findByIdAndDelete(id);
  */
  /*
  change state of user to active = false 
  */
  const user = await User.findByIdAndUpdate(id, {active: false} );
  res.json({
    msg: "delete API - userDelete",
    user
  });
};

module.exports = {
  userGet,
  usersGet,
  userPost,
  userPut,
  // userPatch,
  userDelete,
};
