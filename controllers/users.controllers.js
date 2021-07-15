const { request, response } = require("express");

const usersGet = (req = request, res = response) => {
  const params = req.query;
  

  res.json({ msg: "get API" });
};
const userGet = (req, res = response) => {
  // const id = req.params.id;
  const id = req.params;

  res.json({ msg: "get API" });
};
const userPost = (req = request, res = response) => {
  const {name = 'no name', age = 18} = req.query;
  res.json({ msg: "post API", name, age });
};
const userPut = (req, res = response) => {
  const {name, age} = req.body;
  res.json({ msg: "put API" });
};
const userPatch = (req, res = response) => {
  res.json({ msg: "path API" });
};
const userDelete = (req, res = response) => {
  res.json({ msg: "delete API" });
};

module.exports = { usersGet, userGet, userPost, userPut, userPatch, userDelete };
