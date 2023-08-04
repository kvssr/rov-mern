import express from "express";
import { createLog } from "../controllers/visitlog.js";

const router = express.Router();

router.post("/create", createLog);

export default router;
