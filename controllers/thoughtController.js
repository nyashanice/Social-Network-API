const { Thought } = require("../models/Thought");
const { User } = require("../models/User");

module.exports = {
  // GET ALL THOUGHTS
  getThoughts(req, res) {
    Thought.find()
      .select("-__v")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // GET A SINGLE THOUGHT
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

  // POST A NEW THOUGHT
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

  // UPDATE THOUGHT BY ID
  updateThought(req, res) {
    Thought.findByIdAndUpdate({ _id: req.params.thoughtId }, { $set: req.body })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE THOUGHT BY ID
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

  // CREATE REACTION STORED IN A SINGLE THOUGHT'S REACTIONS ARRAY
  addReaction(req, res) {
    Thought.findByIdAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Error received" })
          : res.json("Reaction added")
      )
      .catch((err) => res.status(500).json(err));
  },
  
  // DELETE A REACTION BY reactionId
  removeReaction(req, res) {
    Thought.findByIdAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.body.reactionId } }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json("Reaction removed")
      )
      .catch((err) => res.status(500).json(err));
  },
};

