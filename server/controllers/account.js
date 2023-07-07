import { prisma } from "../index.js";

export const updateAccountRole = async (req, res) => {
  try {
    const accountId = req.body["id"];
    const roleId = req.body["role"];
    let account = await prisma.account.update({
      where: {
        id: accountId,
      },
      data: {
        accountRoleId: roleId,
      },
    });
    res.status(200).json(account);
  } catch (err) {
    console.log("err", err.message);
    res.status(404).json({ message: err.message });
  }
};
