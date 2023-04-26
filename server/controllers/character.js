import { prisma } from "../index.js";

export const getCharacterRaidStats = async (req, res) => {
  try {
    let charId = Number(req.params.id);
    let statId = Number(req.params.stat);
    if (charId === -1) {
      charId = undefined;
    }
    if (statId === -1) {
      statId = undefined;
    }

    const character = await prisma.character.findFirst({
      where: {
        id: charId,
      },
      include: {
        characterRaidStats: {
          where: {
            valueType: {
              name: "Average",
            },
            statType: {
              id: statId,
            },
          },
          include: {
            statType: true,
            valueType: true,
            character: true,
            raid: true,
          },
        },
        characterRaidInfo: {
          include: {
            raid: true,
          },
        },
        profession: true,
        account: true,
      },
    });
    res.status(200).json(character);
  } catch (err) {
    console.log("err", err.message);
    res.status(404).json({ message: err.message });
  }
};
