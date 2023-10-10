import express from "express";
import {
  createLog,
  getAllLogsCountDay,
  getLogsUserCount,
} from "../controllers/visitlog.js";

const router = express.Router();

router.post("/create", createLog);
router.get("/all/count/day/:startDate", getAllLogsCountDay);
router.get("/all/count/user/:startDate", getLogsUserCount);

export default router;
