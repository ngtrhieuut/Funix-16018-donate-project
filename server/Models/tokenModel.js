import mongoose from "mongoose";

var tokenSchema = new mongoose.Schema({
    userId: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        required: true,
        // ref: "Users",
        // unique: true
    },
    token: {type: String, required: true},
    createdAt: {type: Date, default: Date.now(), expires: 3600} //1 hour
})

const tokenModel = mongoose.model("token", tokenSchema);
export default tokenModel;