import { prisma } from "../index.js";

export const createLog = async (req, res) => {
  const { accountId } = req.body;
  const today = new Date().toDateString();
  const lastLog = await getLastLogByAccountId(accountId);

  if (lastLog.length > 0) {
    const lastLogDate = new Date(lastLog[0].created_at).toDateString();
    if (lastLogDate === today) {
      return "";
    }
  }
  try {
    const newLog = await prisma.visitLog.create({
      data: {
        accountId: accountId,
      },
    });
    res.status(200).json(newLog);
  } catch (err) {
    console.log("🚀 ~ file: visitlog.js:22 ~ createLog ~ err:", err);
    res.status(404).json({ message: err });
  }
};

const getLastLogByAccountId = async (accountId) => {
  try {
    const lastLog = await prisma.visitLog.findMany({
      where: {
        accountId: accountId,
      },
      orderBy: {
        created_at: "desc",
      },
      take: 1,
    });
    return lastLog;
  } catch (error) {
    console.log("error", error);
    return "";
  }
};

export const getAllLogsCountDay = async (req, res) => {
  try {
    const logs = await prisma.visitLog.groupBy({
      by: ["created_at"],
      _count: true,
      orderBy: {
        created_at: "asc",
      },
    });
    res.status(200).json(logs);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};
