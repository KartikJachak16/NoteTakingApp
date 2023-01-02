const mongoose =  require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    // profilepic: String,
    createdAt: {
        type: Date,
        imutable: true,
        default: () => Date.now(),
    },

})
const User = mongoose.model("user", UserSchema)
// User.createIndexes();
module.exports = User