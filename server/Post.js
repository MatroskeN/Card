import mongoose from "mongoose";

const Post = new mongoose.Schema({
    number: {type: String, required: true},
    expiration: {type: String, required: true},
    cvv: {type: String, required: true},
    amount: {type: String, required: true}
})

export default mongoose.model('Post', Post)