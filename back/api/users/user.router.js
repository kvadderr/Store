const router = require("express").Router();
const {
  createUser,
  getUsers,
  updateUsers,
  deleteUser,
  login
} = require("./user.controller");
router.get("/",  getUsers);
router.post("/",  createUser);
router.put("/",  updateUsers);
router.delete("/:id", deleteUser);
router.get("/login/:login/password/:password", login);

module.exports = router;