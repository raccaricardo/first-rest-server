const { response } = require("express");

const getUsers = (req, res = response) => {
  res.json({ msg: "get API" });
};
const postUser = (req, res = response) => {
  res.json({ msg: "post API" });
};
const putUser = (req, res = response) => {
  res.json({ msg: "put API" });
};
const patchUser = (req, res = response) => {
  res.json({ msg: "path API" });
};
const deleteUser = (req, res = response) => {
  res.json({ msg: "delete API" });
};

module.exports = { getUsers, postUser, putUser, patchUser, deleteUser };
