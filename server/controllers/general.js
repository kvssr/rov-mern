import Account from "../models/Account.js";
import { Types, mongo } from "mongoose";

export const getAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findOne({ apiId: id }).exec();
    res.status(200).json(account);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addAccount = async (req, res) => {
  try {
    const account_id = req.body["id"];
    const accountName = req.body["name"];

    const account1 = await Account.exists({ apiId: account_id });
    const accountWithName = await Account.exists({ name: accountName });
    // console.log("raid", raid[""]);
    if (account1) {
      console.log("Account already exists", account1);
    } else if (accountWithName) {
      const account = await Account.findOne({ name: accountName }).then(
        (acc) => {
          acc.apiId = req.body["id"];
          acc.world = req.body["world"];
          acc.guilds = req.body["guilds"];
          acc.save();
          console.log("Account Updated", acc["id"]);
        }
      );
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
