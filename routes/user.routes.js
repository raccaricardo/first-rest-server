const { Router } = require("express");

const { usersGet, userGet, userPost, userPut, userPatch, userDelete } = require("../controllers/users.controllers");

router = Router();

router.get("/", usersGet);
router.get("/:id", userGet);
router.post("/", userPost);
router.put("/:id", userPut);
router.patch("/:id", userPatch);
router.delete("/:id", userDelete);

module.exports = router;
