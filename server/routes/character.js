import express from "express";
import {
    getCharacterRaidStats,
    getCharacterFightStats,
    getFightStats,
} from "../controllers/character.js";

const router = express.Router();

router.get("/raidstats/:id/:stat", getCharacterRaidStats);
router.get("/groups/:id", getCharacterFightStats);
router.get("/fights/:id", getFightStats);

export default router;