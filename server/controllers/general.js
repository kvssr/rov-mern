import Account from "../models/Account.js";
import { Types, mongo } from "mongoose";

export const getAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findById(id);
    res.status(200).json(account);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addAccount = async (req, res) => {
  try {
    const account_id = req.body["id"];

    const account1 = await Account.exists({ apiId: account_id });
    // console.log("raid", raid[""]);
    if (account1) {
      console.log("Account already exists", account1);
    } else {
      const accountjson = req.body;
      accountjson["apiId"] = req.body.id;
      delete accountjson["id"];
      const account = new Account(accountjson);
      await account.save();
      console.log("Account added", account["id"]);
    }
  } catch (err) {
    console.log("server, postLog data error", err);
    res.status(404).json({ message: err.message });
  }
};
