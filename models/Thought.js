const reactionSchema = require("./Reaction");
const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },

    createdAt: { type: Date, default: Date.now, get: reformat },

    // user that created thought
    username: { type: String, required: true },

    // like replies
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// reformats time
function reformat(createdAt) {
  const hours = createdAt.getUTCHours();
  const minutes = createdAt.getUTCMinutes();
  const time = hours + ":" + minutes;
  return time;
}

// retrieves length of thought's `reactions` array field on query
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = { Thought };
