import express from "express";
import { loginUser, postVerifyEmail, registerUser } from "../Controllers/AuthController.js";
import cors from "cors";

const router = express.Router();

router.post('/register', cors(), registerUser);

router.post('/:userId/:token', postVerifyEmail);

router.post('/login', loginUser);

export default router;