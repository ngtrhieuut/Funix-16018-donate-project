import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var donatePostSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    desc: String,
    image: String,
    donatecost: Number,
    startDate: Date,
    endDate: Date,
    status: {type: Number, default: 1},
},  
{
    timestamps: true
}
);

//Export the model
var PostModel = mongoose.model("Posts", donatePostSchema);
export default PostModel;