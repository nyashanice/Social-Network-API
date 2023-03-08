const router = require("express").Router();

const {
  getUsers,
  getOneUser,
  createUser,
  upateUser,
  deleteUSer,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getOneUser).put(upateUser).delete(deleteUSer);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
