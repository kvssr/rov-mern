import express from "express";
import {
  getRaid,
  checkRaidByDateAndTime,
  deleteRaid,
  getListRaidsInfo,
  getRaidDetailsById,
  getRaidTypes,
} from "../controllers/raid.js";

const router = express.Router();

router.get("/details", getRaid);
router.get("/details/:id/:stat", getRaidDetailsById);
router.get("/exists/:date/:time", checkRaidByDateAndTime);
router.post("/delete/:id", deleteRaid);
router.get("/infolist", getListRaidsInfo);
router.get("/raidtypes", getRaidTypes);

export default router;
