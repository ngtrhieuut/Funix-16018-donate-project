import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

//get a User
export const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id);

        if (user) {
            const {password, ...otherDetails} = user._doc;
            
            res.status(200).json(otherDetails);
        } else {
            res.status(404).json('No such user exists');
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// get all users
export const getAllUsers = async (req, res) => {
  try {
      let users = await UserModel.find();
      users = users.map((user)=>{
        const {password, ...otherDetails} = user._doc
        return otherDetails
      })
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
}

//update a user 
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const {_id, currentUserId, currentUserAdminStatus, password} = req.body;

    if (id === _id) {
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }

            const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true});
            const token = jwt.sign(
                {username: user.username, id: user._id},
                process.env.JWTKEY,
                {expiresIn: '1h'}
            )
            res.status(200).json({user, token})
        } catch (error) {
            res.status(500).json({message: error.message}); 
        }
    } else {
        res.status(403).json("Access Denied! You can only update your own profile!")
    }
};

//Delete user 
export const deleteUser = async (req, res) => {
    const id = req.params.id;

    const {currentUserId, currentUserAdminStatus} = req.body;

    if (currentUserId === id) {
        try {
            await UserModel.findByIdAndDelete(id);
            res.status(200).json("delete successfully")
        } catch (error) {
            res.status(500).json({message: error.message}); 
        }
    } else {
        res.status(403).json("Access Denied! You can only delete your own profile!")
    }
};