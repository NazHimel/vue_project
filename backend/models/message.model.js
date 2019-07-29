
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

let messageSchema = new Schema({
  
  from: {
    type: ObjectId,
    ref:'user'
  },
  to: {
    type: ObjectId,
    ref:'user'
  },
  text: {
    type: String,
    
  },
  dateTime: {
    type: Date
  }
});

let MessageModel = mongoose.model('message', messageSchema);
module.exports.MessageModel = MessageModel;
