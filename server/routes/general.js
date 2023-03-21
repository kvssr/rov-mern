import express from "express";
import { getAccount } from "../controllers/general.js";

const router = express.Router();

router.get("/account/:id", getAccount);

export default router;
