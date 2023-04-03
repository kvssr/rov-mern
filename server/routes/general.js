import express from "express";
import { getAccount, addAccount } from "../controllers/general.js";

const router = express.Router();

router.get("/account/:id", getAccount);
router.post("/account/add", addAccount);

export default router;
