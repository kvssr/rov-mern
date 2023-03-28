import express from "express";
import { postLog } from "../controllers/log.js";
import { deleteRaid } from "../controllers/raid.js";

const router = express.Router();

router.get("/post", postLog);
router.post("/post", postLog);

export default router;
