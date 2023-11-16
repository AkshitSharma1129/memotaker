// create models and add mongoose connection
const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
  username: {type: String, required: true, min: 4, unique: true},
  password: {type: String, required: true},
});

const UserModel = model('User', UserSchema);
// model is user so plural is users so users naam ka mini database will be created will will store list of users


module.exports = UserModel;