const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema({
  // TODO: thoughtText (string, req, 1-280 char)
  thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
  // TODO: createdAt (date, set default to current timestamp, getter method to format timestamp on query)
  createdAt: { type: Date, default: Date.now },
  // TODO: username (string, req)
  // user that created thought
  username: { type: String, required: true },
  // TODO: reactions (array of nested docs created with reactionSchema)
  // like replies
  reactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "reaction",
    },
  ],
});

// TODO: virtual called `reactionCount` that retrieves length of thought's `reactions` array field on query
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
