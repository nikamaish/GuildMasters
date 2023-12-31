const mongoose = require ('mongoose');
const userSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    passwordHash:{type:String,required:true},
})

const User = mongoose.model('user',userSchema)
// user is the name of the collection in the database
// userSchema is the schema we created above

module.exports = User;