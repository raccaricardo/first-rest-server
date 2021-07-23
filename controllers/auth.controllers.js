const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/generateJWT");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //verif if emailExist and user is active
    const user = await User.findOne({ email });
    if (user && user.active === true) {
      //verif password
      const validatePassword = bcrypt.compareSync(password, user.password);

      if (validatePassword) {
        //generate JWT
        const token = await generateJWT(user.id);
        res.json({
          msg: "Login OK",
          token,
          user,
        });
      } else {
        res.status(400).json({ msg: "Email or password incorrect or deleted user" });
      }
    } else {
      res.status(400).json({ msg: "User not found - email" });
    }
  }catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something went wrong. Talk to admin",
    });
  }
};

module.exports = {
  login,
};
