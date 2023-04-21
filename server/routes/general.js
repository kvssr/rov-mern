import express from "express";
import {
  getAccount,
  addAccount,
  getCharacters,
  getStatTypes,
} from "../controllers/general.js";

const router = express.Router();

router.get("/account/:id", getAccount);
router.get("/stattypes", getStatTypes);
router.get("/character", getCharacters);
router.post("/account/add", addAccount);

export default router;
