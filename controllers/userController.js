const User = require("../models/User");

module.exports = {
  // TODO: GET ALL USERS
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // TODO: GET A SINGLE USER
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // TODO: POST A NEW USER
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // TODO: PUT TO UPDATE USER BY ID
  updateUser(req, res) {
    User.findByIdAndUpdate({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // TODO: DELETE USER BY ID
  deleteUser(req, res) {
    User.findByIdAndRemove({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    User.findOne({ _id: req.params.userId })
    .select("-__v")
    .then()
  },
};

// TODO: POST TO ADD A NEW FRIEND TO FRIEND LIST
// TODO: DELETE TO REMOVE A FRIEND