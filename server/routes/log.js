import express from "express";
import { postLog } from "../controllers/log.js";

const router = express.Router();

router.get("/post", postLog);

export default router;
