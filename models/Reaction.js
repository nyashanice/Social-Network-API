// schema only
const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema(
  {
    reactionId: { type: ObjectId, default: new ObjectId() },

    reactionBody: { type: String, required: true, maxLength: 280 },

    username: { type: String, required: true },
    // TODO: createdAt (date, default val to current timestamp, getter method to format timestamp on query)
    createdAt: { type: Date, default: Date.now, get: reformat },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

function reformat(createdAt) {
  const hours = createdAt.getUTCHours();
  const minutes = createdAt.getUTCMinutes();
  const time = hours + ":" + minutes;
  return time;
}

// will be used as `reaction` field's subdocument schema in `Thought` model
module.exports = reactionSchema;
