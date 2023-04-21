import Account from "../models/Account.js";
import { Types, mongo } from "mongoose";
import { prisma } from "../index.js";

export const getAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await prisma.account.findFirst({
      where: {
        apiId: id,
      },
    });
    res.status(200).json(account);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addAccount = async (req, res) => {
  try {
    const account_id = req.body["id"];
    const accountName = req.body["name"];
    const account1 = await prisma.account.findFirst({
      where: {
        apiId: account_id,
      },
    });
    const accountWithName = await prisma.account.findFirst({
      where: {
        name: accountName,
      },
    });
    if (account1) {
      console.log("Account already exists with api", account1);
    } else if (accountWithName) {
      console.log("Account already exists without api", accountWithName);
      const updateAccount = await prisma.account.update({
        where: {
          name: accountName,
        },
        data: {
          apiId: account_id,
        },
      });
      console.log("Account updated", accountWithName);
    } else {
      const newAccount = await prisma.character.create({
        data: {
          name: accountName,
          apiId: account_id,
        },
      });
      console.log("Account added", newAccount.name);
    }
  } catch (err) {
    console.log("server, postLog data error", err);
    res.status(404).json({ message: err.message });
  }
};

export const getCharacters = async (req, res) => {
  try {
    const characters = await prisma.character.findMany({
      include: {
        profession: true,
        account: true,
        characterRaidInfo: true,
      },
    });
    console.log("Characters found", characters);
    res.status(200).json(characters);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getStatTypes = async (req, res) => {
  try {
    const statTypes = await prisma.statType.findMany();
    res.status(200).json(statTypes);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
