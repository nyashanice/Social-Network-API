const Thought = require('../models/Thought')

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
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },
  // TODO: PUT TO UPDATE THOUGHT BY ID
  updateThought(req, res) {
    Thought.findByIdAndUpdate({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // TODO: DELETE THOUGHT BY ID
  deleteThought(req, res) {
    Thought.findByIdAndRemove({ _id: req.params.userId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};


// TODO: CREATE ROUTE '/:thoughtId/reactions'
// TODO: POST TO CREATE REACTION STORED IN A SINGLE THOUGHT'S REACTIONS ARRAY
// TODO: DELETE A REACTION BY reactionId