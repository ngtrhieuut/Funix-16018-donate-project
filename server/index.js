import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import DonateRoute from "./Routes/DonateRoute.js";
import CheckRouter from "./Routes/CheckUserRouter.js";
import path from "path";
import cookieParser from "cookie-parser";
import {URL} from 'url';

const app = express();
const __dirname = new URL('.', import.meta.url).pathname

//to serve images for public
app.use(express.static('public'));
app.use('/images', express.static("images"));

//Midleware
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());
app.use(cookieParser())
dotenv.config();

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


mongoose
    .connect(
        process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(result => {
        app.listen(process.env.PORT || 8000, '0.0.0.0', () => { //deploy heroku with ip '0.0.0.0'
            console.log('Server is running at PORT ', process.env.PORT);
        })
    })
    .catch(err => console.log(err));


//usage of routes
app.use('/auth', AuthRoute);
// app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/donate', DonateRoute);
app.use('/user', CheckRouter);
