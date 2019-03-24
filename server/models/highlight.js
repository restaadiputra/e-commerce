const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const highlightSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  image: String,
});

const Highlight = mongoose.model('Highlight', highlightSchema);

module.exports = Highlight;