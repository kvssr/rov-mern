import express from "express";
import {
  updateAccount,
  createAccount,
  getAccountByApiId,
  deleteAccount,
  getAccountById,
  getAccountByName,
} from "../controllers/account.js";

const router = express.Router();

router.post("/update", updateAccount);
router.get("/get/api/:id", getAccountByApiId);
router.get("/get/name/:name", getAccountByName);
router.get("/get/:id", getAccountById);
router.post("/delete", deleteAccount);
router.post("/create", createAccount);

export default router;
