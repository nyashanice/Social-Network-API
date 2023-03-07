// schema only
const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  // TODO: reactionId (mongoose ObjectId data type, default value is set to new ObjectId)
  reactionId: {type: ObjectId, default: new ObjectId},
  // TODO: reactionBody (string, req, 280 char max)
  reactionBody: {type: String, required: true, maxLength: 280},
  // TODO: username (string, req)
  username: {type: String, required: true},
  // TODO: createdAt (date, default val to current timestamp, getter method to format timestamp on query)
  createdAt: {type: Date, default: Date.now}
});




// will be used as `reaction` field's subdocument schema in `Thought` model