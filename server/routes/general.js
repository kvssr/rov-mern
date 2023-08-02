import express from "express";
import {
  getCharacters,
  getStatTypes,
  getAccountRoles,
  getUsers,
  getProfessions,
} from "../controllers/general.js";

const router = express.Router();

router.get("/stattypes", getStatTypes);
router.get("/character", getCharacters);
router.get("/account/roles", getAccountRoles);
router.get("/users", getUsers);
router.get("/professions", getProfessions);

export default router;
