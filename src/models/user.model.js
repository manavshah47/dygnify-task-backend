const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  email: {
    type:String,
    required:true,
    unique:true
  },

  phoneNo: {
    type: String,
    required: true
  },

  gender: {
    type: String,
    enum:["male","female","other"],
    required:true
  },

  business: {
    type:[mongoose.Schema.Types.ObjectId],
    ref:'business',
    default:[]
  }
});

const User = mongoose.model("user", userSchema);
module.exports.User = User;
