import { prisma } from "../index.js";

export const getCharacters = async (req, res) => {
  try {
    const characters = await prisma.character.findMany({
      include: {
        profession: true,
        account: true,
        characterRaidInfo: true,
      },
      orderBy: {
        name: "asc",
      },
    });
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

export const getAccountRoles = async (req, res) => {
  try {
    const accountRoles = await prisma.accountRole.findMany();
    res.status(200).json(accountRoles);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.account.findMany({
      where: {
        NOT: {
          apiId: null,
        },
      },
      select: {
        id: true,
        name: true,
        accountRoleId: true,
      },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
