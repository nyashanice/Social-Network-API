const { Thought } = require("../models/Thought");
const { User } = require("../models/User");

module.exports = {
  // TODO: GET ALL THOUGHTS
  getThoughts(req, res) {
    Thought.find()
      .select("-__v")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // TODO: GET A SINGLE THOUGHT
  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // TODO: POST A NEW THOUGHT
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findByIdAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message:
                "Thought successfully created but no user found with that ID",
            })
          : res.json("Thought added!")
      )
      .catch((err) => res.status(500).json(err));
  },
  // TODO: PUT TO UPDATE THOUGHT BY ID
  updateThought(req, res) {
    Thought.findByIdAndUpdate({ _id: req.params.thoughtId }, { $set: req.body })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // TODO: DELETE THOUGHT BY ID
  deleteThought(req, res) {
    Thought.findByIdAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } }
            )
      )
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
      Thought.create(req.params)
        .then(() => {
          return User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } }
          );
        })
        .then((user) =>
          !user
            ? res.status(404).json({ message: "Error received" })
            : res.json("Friend added")
        )
        .catch((err) => res.status(500).json(err));
  }
};

// TODO: CREATE ROUTE '/:thoughtId/reactions'
// TODO: POST TO CREATE REACTION STORED IN A SINGLE THOUGHT'S REACTIONS ARRAY
// TODO: DELETE A REACTION BY reactionId
