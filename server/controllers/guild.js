import { prisma } from "../index.js";

export const getGuildByApiId = async (req, res) => {
  try {
    const guild = await prisma.guild.findFirst({
      where: {
        apiId: req.params.apiId,
      },
    });
    res.status(200).json(guild);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
