import express from "express";
import { getAllDonate, postDonate } from "../Controllers/DonateController.js";

const router = express.Router();

router.post('/', postDonate);

router.get('/', getAllDonate);

export default router;

