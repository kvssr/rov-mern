import express from "express";
import {
  getRaid,
  checkRaidByDateAndTime,
  deleteRaid,
} from "../controllers/raid.js";

const router = express.Router();

router.get("/details", getRaid);
router.get("/exists/:date/:time", checkRaidByDateAndTime);
router.post("/delete/:id", deleteRaid);

export default router;
