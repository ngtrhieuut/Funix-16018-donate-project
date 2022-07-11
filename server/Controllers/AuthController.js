import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import tokenModel from "../Models/tokenModel.js";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

//registering a new User
export const registerUser = async(req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPass;
    const newUser = new UserModel(req.body);
    const {username} = req.body;
    try {
        const oldUser = await UserModel.findOne({username});

        if (oldUser) {
            return res.status(400).json({message: "username is already registered!"})
        }
        
        const user = await newUser.save();

        const token = jwt.sign({
            username: user.username,
            id: user._id
        }, process.env.JWTKEY, {expiresIn: '1h'});

        const newToken = new tokenModel({
            userId: user._id,
            token: token
        })

        newToken.save();
        
        const transport = nodemailer.createTransport({
            host: process.env.HOST,
            port: process.env.EMAIL_PORT,
            auth: {
              user: process.env.USER,
              pass: process.env.PASS
            }
          });

          await transport.sendMail({
            from: process.env.HOST_EMAIL,
            to: user.username,
            subject: "Confirm email",
            html: `<div className="email" style="
            border: 1px solid black;
            padding: 20px;
            font-family: sans-serif;
            line-height: 2;
            font-size: 20px; 
            ">
            <h2>Click here to confirm your email</h2>
            <button><a href="http://localhost:3000/auth/${user._id}/${token}">Active your email</a></button>
        
            <p>All the best, Donate App</p>
             </div>
        `
        })
        res.status(200).json({user, token})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//login user

export const loginUser = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await UserModel.findOne({username: username});

        if (user) {
            const validity = await bcrypt.compare(password, user.password);

            if (!validity) {
                res.status(400).json("Wrong password");
            } else {
                const token = jwt.sign({
                    username: user.username,
                    id: user._id
                }, process.env.JWTKEY, {expiresIn: '12h'});
                res.status(200).json({user, token});
            }
        } else {
            res.status(404).json("User does not exists");
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Post Verify Email
export const postVerifyEmail = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        // console.log(user);
        if (!user) return res.status(400).send({message: "Invalid Link"});

        const token = await tokenModel.findOne({
            userId: req.params.userId,
            token: req.params.token
        })
        if (!token) return res.status(400).send({message: "Invalid Link"});

        await user.updateOne({activeUser: true});
        console.log(user);
        await token.remove();

        res.status(200).send({message: "Email verified successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}
