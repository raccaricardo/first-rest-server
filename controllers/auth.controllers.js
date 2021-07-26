const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/google-verify");

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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something went wrong. Talk to admin",
    });
  }
};

const loginGoogle = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, email, img, google } = await googleVerify(id_token);
    let user = await User.findOne({ email });
    const data = {
      name,
      email,
      password: ':P',
      img,
      google: true
    }
    if (!user) {

      const user = new User(data);
      await user.save();

    } else {
      if (!user.active) {
        return res.status(401).json({
          msg: 'Contact with admin - User deleted'
        })
      } else {
        if (user.img != img || !user.google || user.name != name) {
          const newUserData = { name, img, google: true };
          user = await User.findByIdAndUpdate(user.id, newUserData);

        }
      }

    }

    //generate JWT
    const token = await generateJWT(user.id);
    res.json({
      msg: 'google sign successful',
      token,
      user
    })
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: 'invalid token'
    })
  }
};

module.exports = {
  login,
  loginGoogle
};
