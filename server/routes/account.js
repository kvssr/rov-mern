import express from "express";
import { updateAccountRole } from "../controllers/account.js";

const router = express.Router();

router.post("/role/update", updateAccountRole);

export default router;
