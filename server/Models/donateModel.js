import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var donateSchema = new mongoose.Schema({
    userDonateId: {type: String, required: true},
    donatePostId: {type: String, required: true},
    status: Boolean,
    donate: Number,
    donateNote: String,
},
{
    timestamps: true
}
);

//Export the model
var PostModel = mongoose.model("Donated", donateSchema);
export default PostModel;