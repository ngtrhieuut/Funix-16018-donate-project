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


const app = express();

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
    .then(() => app.listen(
        process.env.PORT, 
        () => console.log('App listening at port', process.env.PORT)
        )
    )
    .catch(err => console.log(err));

//usage of routes
app.use('/auth', AuthRoute);
// app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/donate', DonateRoute);
app.use('/user', CheckRouter);
