import express from "express";
import { postLog, addLog } from "../controllers/log.js";
import { deleteRaid } from "../controllers/raid.js";

const router = express.Router();

router.get("/post", postLog);
router.post("/post", addLog);

export default router;
