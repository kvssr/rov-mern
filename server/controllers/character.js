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

export const getCharacterFightStats = async (req, res) => {
  try {
    const raidId = Number(req.params.id);
    console.log(
      "🚀 ~ file: character.js:54 ~ getCharacterFightStats ~ id:",
      raidId
    );

    const fightStats = await prisma.character.findMany({
      where: {
        characterRaidInfo: {
          some: {
            raidId: raidId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        profession: {
          select: {
            id: true,
            name: true,
            name_short: true,
            color: true,
          },
        },
        account: {
          select: {
            id: true,
            name: true,
          },
        },
        characterFightInfo: {
          where: {
            fight: {
              raidId: raidId,
            },
          },
          select: {
            id: true,
            fightId: true,
            buildTypeId: true,
            group: true,
            time_active: true,
            time_in_combat: true,
          },
        },
        characterFightStat: {
          where: {
            fight: {
              raidId: raidId,
            },
          },
          select: {
            id: true,
            fightId: true,
            statTypeId: true,
            valueTypeId: true,
            value: true,
          },
        },
      },
    });

    res.status(200).json(fightStats);
  } catch (err) {
    console.log("err", err.message);
    res.status(404).json({ message: err.message });
  }
};

export const getFightStats = async (req, res) => {
  try {
    const raidId = Number(req.params.id);
    console.log(
      "🚀 ~ file: character.js:54 ~ getCharacterFightStats ~ id:",
      raidId
    );
    const fightStats = await prisma.fight.findMany({
      where: {
        raidId: raidId,
      },
      select: {
        id: true,
        fight_number: true,
        start_time: true,
        end_time: true,
        allies: true,
        enemies: true,
        duration: true,
        kills: true,
        skipped: true,
        characterFightInfo: {
          select: {
            characterId: true,
            buildTypeId: true,
            group: true,
            time_active: true,
            time_in_combat: true,
          },
        },
        characterFightStats: {
          select: {
            characterId: true,
            statTypeId: true,
            valueTypeId: true,
            value: true,
          },
        },
      },
      orderBy: {
        fight_number: "asc",
      },
    });

    fightStats.map((fight) => {
      fight.characters = [];

      fight.characterFightInfo.map((fightInfo) => {
        fight.characters[fightInfo.characterId] = {
          id: fightInfo.characterId,
          group: fightInfo.group,
          time_active: fightInfo.time_active,
          time_in_combat: fightInfo.time_in_combat,
        };
      });

      fight.characterFightStats.map((fightStats) => {
        const character = fight.characters[fightStats.characterId];
        character[fightStats.statTypeId] = fightStats.value;
      });

      fight.characters = fight.characters.filter((n) => n);
      delete fight.characterFightInfo;
      delete fight.characterFightStats;
    });

    res.status(200).json(fightStats);
  } catch (err) {
    console.log("err", err.message);
    res.status(404).json({ message: err.message });
  }
};

export const getCharactersInRaid = async (req, res) => {
  try {
    const raidId = Number(req.params.id);
    let characters = {};
    const charactersQuery = await prisma.character.findMany({
      where: {
        characterRaidStats: {
          some: {
            raidId: raidId,
          },
        },
      },
      include: {
        profession: true,
        account: true,
      },
    });

    charactersQuery.forEach((character) => {
      characters[character.id] = character;
    });
    res.status(200).json(characters);
  } catch (err) {
    console.log("err", err.message);
    res.status(404).json({ message: err.message });
  }
};
