import express from "express";
import { getGuildByApiId } from "../controllers/guild.js";

const router = express.Router();

router.get("/api/:id", getGuildByApiId);

export default router;
