import express from "express";
import { getRaid } from "../controllers/raid.js";

const router = express.Router();

router.get("/details", getRaid);

export default router;
