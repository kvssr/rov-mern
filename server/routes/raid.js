import express from "express";
import {
  getRaid,
  checkRaidByDateAndTime,
  deleteRaid,
  getListRaidsInfo,
  getRaidById,
} from "../controllers/raid.js";

const router = express.Router();

router.get("/details", getRaid);
router.get("/details/:id", getRaidById);
router.get("/exists/:date/:time", checkRaidByDateAndTime);
router.post("/delete/:id", deleteRaid);
router.get("/infolist", getListRaidsInfo);

export default router;
