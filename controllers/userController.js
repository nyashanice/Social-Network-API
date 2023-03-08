const { User } = require("../models/User");
const { Thought } = require("../models/Thought");

module.exports = {
  // GET ALL USERS
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  
  // GET A SINGLE USER
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

  // POST A NEW USER
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // UPDATE USER BY ID
  updateUser(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { username: req.body.username },
      { email: req.body.email }
    )
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE USER BY ID
  deleteUser(req, res) {
    User.findByIdAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: "Deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  // ADD A NEW FRIEND TO FRIEND LIST
  addFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "Error received" })
          : res.json("Friend added")
      )
      .catch((err) => res.status(500).json(err));
  },

  // REMOVE A FRIEND
  removeFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No friend found with that ID" })
          : res.json("Friend removed")
      )
      .catch((err) => res.status(500).json(err));
  },
};

