import Users from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from '../Util/sendMail.js';
import {google} from "googleapis";
import fetch from "node-fetch";

const {OAuth2} = google.auth

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const {CLIENT_URL} = process.env

const userCtrl = {
    //register a new user
    register: async (req, res) => {
        try {
            const {username, firstname, lastname, password} = req.body;
            
            if(!username || !firstname || !lastname || !password)
                return res.status(400).json({msg: "Please fill in all fields."})

            if(!validateEmail(username))
                return res.status(400).json({msg: "Invalid emails."})

            const user = await Users.findOne({username})
            if(user) return res.status(400).json({msg: "This email already exists."})

            if(password.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters."})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                username, password: passwordHash, firstname, lastname, 
            }

            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            sendMail(username, url, "Verify your email address", false)

            res.json({msg: "Register Success! Please activate your email before login."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //active email by mail
    activateEmail: async (req, res) => {
        try {
            const {token} = req.body

            const user = jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET)

            const {username, firstname, lastname, password} = user

            const check = await Users.findOne({username})
            if (check) return res.status(400).json({msg:"This email already exists."})

            const newUser = new Users({
                username, password, firstname, lastname, activeUser: true
            })

            await newUser.save()

            res.json({msg: "Account has been activated!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //login
    login: async (req, res) => {
        try {
            const {username, password} = req.body
            const user = await Users.findOne({username})
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            res.json({msg: "Login success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // Access Token
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg: "Please login now!"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({msg: "Please login now!"})

                const access_token = createAccessToken({id: user.id})
                res.json({access_token})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //forgot password
    forgotPassword: async (req, res) => {
        try {
            const {username} = req.body
            const user = await Users.findOne({username})
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const access_token = createAccessToken({id: user._id})
            const url = `${CLIENT_URL}/user/reset/${access_token}`

            sendMail(username, url, "Reset your password", true)
            res.json({msg: "Re-send the password, please check your email."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //reset password
    resetPassword: async (req, res) => {
        try {
            const {password} = req.body
            const passwordHash = await bcrypt.hash(password, 12)

            await Users.findOneAndUpdate({_id: req.user.id}, {
                password: passwordHash
            })

            res.json({msg: "Password successfully changed!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //get user info
    getUserInfor: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            user ? res.json(user) : res.json("please login")
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //get all user
    getUsersAllInfor: async (req, res) => {
        try {
            const users = await Users.find().select('-password')

            res.json(users)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //logout
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Logged out."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //update user
    updateUser: async (req, res) => {
        try {
            const {username, firstname, lastname} = req.body
            await Users.findOneAndUpdate({_id: req.user.id}, {
                username, firstname, lastname
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //update user admin
    updateUsersRole: async (req, res) => {
        try {
            const {isAdmin} = req.body

            await Users.findOneAndUpdate({_id: req.params.id}, {
                isAdmin
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //delete user
    deleteUser: async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id)

            res.json({msg: "Deleted Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //google login
    googleLogin: async (req, res) => {
        try {
            const {tokenId} = req.body

            const verify = await client.verifyIdToken({idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID})
            
            const {email_verified, email, name, picture} = verify.payload

            const password = email + process.env.GOOGLE_SECRET

            const passwordHash = await bcrypt.hash(password, 12)

            if(!email_verified) return res.status(400).json({msg: "Email verification failed."})

            const user = await Users.findOne({username: email})

            if(user){
                const isMatch = await bcrypt.compare(password, user.password)
                if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

                const refresh_token = createRefreshToken({id: user._id})
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })

                res.json({msg: "Login success!"})
            }else{
                const newUser = new Users({
                    username: email, firstname: "test", lastname: "test", password: passwordHash, activeUser: true
                })

                await newUser.save()
                
                const refresh_token = createRefreshToken({id: newUser._id})
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })

                res.json({msg: "Login success!"})
            }


        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //facebook login 
    facebookLogin: async (req, res) => {
        try {
            const {accessToken, userID} = req.body

            const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`
            
            const data = await fetch(URL).then(res => res.json()).then(res => {return res})

            const {email, name, picture} = data

            const password = email + process.env.FACEBOOK_SECRET

            const passwordHash = await bcrypt.hash(password, 12)

            const user = await Users.findOne({email})

            if(user){
                const isMatch = await bcrypt.compare(password, user.password)
                if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

                const refresh_token = createRefreshToken({id: user._id})
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })

                res.json({msg: "Login success!"})
            }else{
                const newUser = new Users({
                    name, email, password: passwordHash, avatar: picture.data.url
                })

                await newUser.save()
                
                const refresh_token = createRefreshToken({id: newUser._id})
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })

                res.json({msg: "Login success!"})
            }


        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}





function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

export default userCtrl;