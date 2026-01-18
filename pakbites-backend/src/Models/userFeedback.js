const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    fullName:{type:String,required:true},
    gmail:{type:String,required:true},
    subject:{type:String,required:true},
    message:{type:String,required:true},
})

const userFeedback = mongoose.model("userFeedback",feedbackSchema);

module.exports= userFeedback;