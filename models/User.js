const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  wines: String
});

mongoose.model('users', userSchema);
