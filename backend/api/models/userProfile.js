const mongoose= require('mongoose');
userSchema = mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    email:String,
    password:String
})

module.exports= mongoose.model('user',userSchema);