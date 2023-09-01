import express from "express";
import { createLog, getAllLogsCountDay } from "../controllers/visitlog.js";

const router = express.Router();

router.post("/create", createLog);
router.get("/all/count/day", getAllLogsCountDay);

export default router;
