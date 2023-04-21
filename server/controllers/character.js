import { prisma } from "../index.js";

export const getCharacterRaidStats = async (req, res) => {
  try {
    const charName = req.params.name;
    const character = await prisma.character.findFirst({
      where: {
        name: charName,
      },
      include: {
        characterRaidStats: {
          where: {
            valueType: {
              name: "Average",
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
