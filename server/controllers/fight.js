import { prisma } from "../index.js";

export const getFightsByRaidId = async (req, res) => {
  try {
    const { id } = req.params;
    const fights = await prisma.fight.findMany({
      where: {
        raidId: Number(id),
      },
      include: {
        fightStats: true,
      },
      orderBy: {
        fight_number: "asc",
      },
    });
    res.status(200).json(fights);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};
