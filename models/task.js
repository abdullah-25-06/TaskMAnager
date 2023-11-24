const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, //Yeh aessay bhi hoskta hai or aessay bhi required:[true/false,'msg']
    trim: true, //This trims the whitespace
    maxlength: [20, "cannot be more than 20 characters"],
    minlength: 3,
  },
  completed: { type: Boolean, default: false },
  owner:{//foreign key refrencing
    _id: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User'//yeh jiss model ki foreign field hai uska naam yahn par 
  }
});
//controller mai await Task.populate('owner').execPopulate() -> yeh ab poora user doc yahn lay ayee gaw owner ka 
module.exports = mongoose.model("Task", TaskSchema);
