import { prisma } from "../index.js";

export const getAccountByApiId = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await prisma.account.findFirst({
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

export const UpdateKeyOrCreateAccount = async (req, res) => {
  try {
    const { apiId, accountName, inGuild } = req.body;
    let account = await prisma.account.findFirst({
      where: {
        name: accountName,
      },
    });
    if (account) {
      account = await prisma.account.update({
        where: {
          name: accountName,
        },
        data: {
          apiId: apiId,
        },
      });
    } else {
      account = await createAccountWithRole(accountName, apiId, inGuild);
    }

    res.status(200).json(account);
  } catch (err) {
    console.log("Couldnt update account", err);
    // res.status(404).json({ message: err.message });
    res.status(404).json(err);
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

const createAccountWithRole = async (name, apiId, inGuild) => {
  let role = prisma.accountRole.findFirst({ where: { name: "Guest" } });
  if (inGuild) {
    role = await prisma.accountRole.findFirst({ where: { name: "User" } });
  }
  try {
    const account = await prisma.account.create({
      data: {
        name: name,
        apiId: apiId,
        accountRoleId: role.id,
      },
    });
    return account;
  } catch (e) {
    console.log("Account already exists", e);
    return null;
  }
};

export const updateAccount = async (req, res) => {
  try {
    let account = await prisma.account.upsert({
      where: {
        name: req.body["name"],
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
