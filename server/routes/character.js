import express from "express";
import { getCharacterRaidStats } from "../controllers/character.js";

const router = express.Router();

router.get("/raidstats/:id/:stat", getCharacterRaidStats);

export default router;
