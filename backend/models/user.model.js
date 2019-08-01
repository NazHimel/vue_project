/* eslint-disable standard/object-curly-even-spacing */
/* eslint-disable object-curly-spacing */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
// eslint-disable-next-line no-undef
ObjectId = Schema.ObjectId;

let userSchema = new Schema({
  
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  username: {
    type: String,
    unique: true
  },
  mobileNumber: {
    type: String
  },
  hash:
  {
    type: String
  },
  salt:
  {
    type: String
  },
  is_admin:
  {
    type: Boolean
  },
  status:
  {
    type: String
  },
  socketId:
  {
    type: String
  }


});
userSchema.static.findUserById = function (userId) {
  return this.findOne({ _id: userId }).exec();
};

userSchema.plugin(passportLocalMongoose);

let User = mongoose.model('user', userSchema);
module.exports.User = User;
