const mongoose = require('mongoose');

delete mongoose.connection.models.Client;
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: String,
  description: String,
  url: String,
  image: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Client', clientSchema);
