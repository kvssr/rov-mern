import express from "express";
import {
  getAccount,
  addAccount,
  getCharacters,
  getStatTypes,
  getAccountRoles,
  getUsers,
} from "../controllers/general.js";

const router = express.Router();

router.get("/account/get/:id", getAccount);
router.get("/stattypes", getStatTypes);
router.get("/character", getCharacters);
router.post("/account/add", addAccount);
router.get("/account/roles", getAccountRoles);
router.get("/users", getUsers);

export default router;
