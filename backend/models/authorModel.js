
const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  era: { type: String, required: true },
  shortDescription: { type: String, required: true },
  longDescription: { type: String, required: true },
});

module.exports = mongoose.model("Author", authorSchema);


