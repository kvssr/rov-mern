import express from "express";
import {
  getCharacters,
  getStatTypes,
  getAccountRoles,
  getUsers,
} from "../controllers/general.js";

const router = express.Router();

router.get("/stattypes", getStatTypes);
router.get("/character", getCharacters);
router.get("/account/roles", getAccountRoles);
router.get("/users", getUsers);

export default router;
