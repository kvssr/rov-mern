getFightsByRaidId;

import express from "express";
import { getFightsByRaidId } from "../controllers/fight.js";

const router = express.Router();

router.get("/all/:id", getFightsByRaidId);

export default router;
