import { Prisma } from "@prisma/client";
import { prisma } from "../index.js";

export const getAccountByApiId = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await prisma.account.findUnique({
      where: {
        apiId: id,
      },
      include: {
        accountRole: true,
      },
    });
    res.status(200).json(account);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await prisma.account.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        accountRole: true,
      },
    });
    res.status(200).json(account);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAccountByName = async (req, res) => {
  try {
    const { name } = req.params;
    const account = await prisma.account.findUnique({
      where: {
        name: name,
      },
      include: {
        accountRole: true,
      },
    });
    res.status(200).json(account);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createAccount = async (req, res) => {
  try {
    const account = await prisma.account.create({
      data: req.body,
    });
    res.status(200).json(account);
  } catch (e) {
    console.log("Account already exists", e);
    res.status(404).json({ e });
  }
};

export const updateAccount = async (req, res) => {
  try {
    const accountId = req.body["id"];
    let account = await prisma.account.upsert({
      where: {
        id: accountId,
      },
      update: req.body,
      create: req.body,
    });
    res.status(200).json(account);
  } catch (err) {
    console.log("Update account failed", err.message);
    res.status(404).json({ message: err.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const account = await prisma.account.delete({
      where: req.body,
    });
    res.status(200).json("Account deleted");
    console.log("account deleted", account);
  } catch (err) {
    console.log("Delete account failed", err.message);
    res.status(404).json({ message: err.message });
  }
};
