import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var UserSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required: [true, "Please enter your email as username!"],
            trim: true,
            unique: true
        },
        password:{
            type:String,
            required:[true, "Please enter your password!"],
        },
        firstname:{
            type:String,
            required:[true, "Please enter your first name!"],
            trim: true
        },
        lastname:{  
            type:String,
            required:[true, "Please enter your last name!"],
            trim: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        activeUser: {
            type: Boolean,
            default: false
        },
    },
    {timestamps: true}
);

//Export the model
const UserModel = mongoose.model('Users', UserSchema) 
export default UserModel;