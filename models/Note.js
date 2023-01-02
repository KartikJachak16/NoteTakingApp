const mongoose =  require("mongoose");
const { Schema } = mongoose;


const noteSchema = new Schema({
    title: String,
    description: String,
    createdAt: {
        type: Date,
        imutable: true,
        default: () => Date.now(),
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
})

const Note = mongoose.model("note", noteSchema)
module.exports = Note
