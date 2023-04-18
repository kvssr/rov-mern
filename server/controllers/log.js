import Raid from "../models/Raid.js";
import Character from "../models/Character.js";
import Account from "../models/Account.js";
import { prisma } from "../index.js";

export const postLog = async (req, res) => {
  try {
    const start_date = req.body["overall_raid_stats"]["date"];
    const start_time = req.body["overall_raid_stats"]["start_time"];
    console.log("start_time", start_time);
    console.log("start_date", start_date);
    const raid = await Raid.findOne({
      // overall_raid_stats: { start_date: start_date, start_time: start_time },
      "overall_raid_stats.date": start_date,
      "overall_raid_stats.start_time": start_time,
    });
    // console.log("raid", raid[""]);
    if (raid) {
      console.log("Raid already exists", raid["_id"]);
    } else {
      const raid = await Raid.create(req.body);
      const raidId = raid._id;
      console.log("Raid added", raid["_id"]);
      const players = req.body["players"];
      players.forEach((data) => {
        const player = addCharacter(data).then((character) => {
          const account1 = addAccount(data.account).then((account) => {
            character.account = account;
            // console.log("Player completed", character);
            if (
              character.raids.includes({
                ...data,
                raid: raidId,
                startDate: start_date,
                startTime: start_time,
              }) === false
            ) {
              character.raids.push({
                ...data,
                raid: raidId,
                startDate: start_date,
                startTime: start_time,
              });
            }
            character.save();
            if (account.characters.includes(character._id) === false) {
              console.log("Character not in characters", character._id);
              console.log("Character not in characters", account.characters);
              account.characters.push(character);
            }
            account.save();
            // console.log("Adding character", character);
            // console.log("Adding account", account);
          });
        });
      });
    }
    res.status(200).json("Log added successfully");
  } catch (err) {
    console.log("server, postLog data error", err);
    res.status(404).json({ message: err.message });
  }
};

export const addLog = async (req, res) => {
  try {
    const start_date = req.body["overall_raid_stats"]["date"];
    const start_time = req.body["overall_raid_stats"]["start_time"];
    const full_time = new Date(`${start_date} ${start_time}`);
    console.log("start_time", full_time);
    console.log("start_date", full_time);
    const raid = await prisma.raid.findFirst({
      where: { start_date: full_time, start_time: full_time },
    });
    // console.log("raid", raid[""]);
    if (raid) {
      console.log("Raid already exists");
    } else {
      const end_time = req.body["overall_raid_stats"]["end_time"];
      const full_end_time = new Date(`${start_date} ${end_time}`);
      const raid = await addRaid(
        req.body["overall_raid_stats"],
        full_time,
        full_end_time
      );
      const raid_stats = await addRaidStats(
        raid.id,
        req.body["overall_squad_stats"]
      );
      const fights = await addFights(raid.id, req.body["fights"]);
      req.body["players"].forEach(async (player) => {
        const character_data = await addCharacterData(raid.id, player);
      });
    }
    console.log("Successfully added log");
    res.status(200).json({ message: "raid added" });
  } catch (err) {
    console.log("server, postLog data error", err);
    res.status(404).json({ message: err.message });
  }
};

const addRaid = async (data, full_time, full_end_time) => {
  const raid = await prisma.raid.create({
    data: {
      start_date: full_time,
      start_time: full_time,
      end_time: full_end_time,
      name: "test",
      min_allies: data["min_allies"],
      max_allies: data["max_allies"],
      mean_allies: data["mean_allies"],
      min_enemies: data["min_enemies"],
      max_enemies: data["max_enemies"],
      mean_enemies: data["mean_enemies"],
      total_kills: data["total_kills"],
      raidTypeId: 1,
    },
  });
  return raid;
};

const addRaidStats = async (raid_id, data) => {
  for (const key in data) {
    console.log("row", key);
    const stat_type = await prisma.statType.findFirst({
      where: { name_json: key },
    });
    const valueType = await getValueType(data[key]).then(async (value) => {
      const raid_stats = await prisma.raidStat.create({
        data: {
          raidId: raid_id,
          statTypeId: stat_type.id,
          valueTypeId: value.id,
          value: data[key],
        },
      });
    });
  }
};

const getValueType = async (value) => {
  if (Number(value) % 1 === 0) {
    const value_type = await prisma.valueType.findFirst({
      where: { name: "Total" },
    });
    // console.log("VALUE TYPE 1", value_type);
    return value_type;
  } else {
    const value_type = await prisma.valueType.findFirst({
      where: { name: "Average" },
    });
    // console.log("VALUE TYPE 2", value_type);
    return value_type;
  }
};

const addFights = async (raid_id, data) => {
  let fight_number = 1;
  data.forEach(async (row, x) => {
    const start_time = new Date(row["start_time"]);
    const end_time = new Date(row["end_time"]);
    const fight = await prisma.fight.create({
      data: {
        raidId: raid_id,
        fight_number: x,
        start_time: start_time,
        end_time: end_time,
        allies: row["allies"],
        enemies: row["enemies"],
        duration: row["duration"],
        kills: row["kills"],
        skipped: row["skipped"],
      },
    });
    fight_number += 1;
    const total_type = await prisma.valueType.findFirst({
      where: { name: "Total" },
    });
    const avg_type = await prisma.valueType.findFirst({
      where: { name: "Average" },
    });
    const avg_stats = row["avg_stats"];
    const avg_fight_stats = addFightStats(fight.id, avg_type.id, avg_stats);

    const total_stats = row["total_stats"];
    const total_fight_stats = addFightStats(
      fight.id,
      total_type.id,
      total_stats
    );
  });
};

const addFightStats = async (fight_id, value_type_id, data) => {
  for (const key in data) {
    const stat_type = await prisma.statType.findFirst({
      where: { name_json: key },
    });
    const fight_stats = await prisma.fightStat.create({
      data: {
        fightId: fight_id,
        statTypeId: stat_type.id,
        valueTypeId: value_type_id,
        value: data[key],
      },
    });
  }
};

const addCharacterData = async (raid_id, data) => {
  console.log("Adding character data");
  console.log("🚀 ~ file: log.js:211 ~ addCharacterData ~ data:", data.account);
  let account = await getAccountByName(data.account);
  if (!account) {
    account = await addAccount(data.account);
  }
  console.log("🚀 ~ file: log.js:213 ~ addCharacterData ~ account:", account);

  let profession = await getProfessionByName(data.profession);
  if (!profession) {
    profession = await addProfession(data.profession);
  }
  console.log(
    "🚀 ~ file: log.js:219 ~ addCharacterData ~ profession:",
    profession
  );
  let character = await getCharacterByName(data.name);
  if (!character) {
    console.log(`Adding ${data.name}, ${account.id}, ${profession.id}`);
    character = await addCharacter(data.name, account.id, profession.id);
  }
  console.log(
    "🚀 ~ file: log.js:224 ~ addCharacterData ~ character:",
    character
  );

  const character_raid_info = await addCharacterRaidInfo(
    raid_id,
    character.id,
    data
  );
  // Adding Raid stats
  for (const key in data.total_stats) {
    const value_type = await getValueType(data.total_stats[key]);
    const stat_type = await prisma.statType.findFirst({
      where: { name_json: key },
    });
    const character_raid_stat = addCharacterRaidStat(
      raid_id,
      character.id,
      stat_type.id,
      value_type.id,
      data.total_stats[key]
    );
  }

  //Adding Fight stats
  let fight_number = 1;
  for (const [i, row] of data.stats_per_fight.entries()) {
    if (row.time_active === -1) {
      fight_number += 1;
      continue;
    }
    const fight = await prisma.fight.findFirst({
      where: {
        raidId: raid_id,
        fight_number: i,
      },
    });
    console.log(`CFI ${row.time_active} ---- ${row.group}`);
    const character_fight_info = await addCharacterFightInfo(
      fight.id,
      character.id,
      row.time_active,
      row.time_in_combat,
      row.group
    );
    fight_number += 1;
    for (const key in row) {
      const value_type = await getValueType(data.total_stats[key]);
      const stat_type = await prisma.statType.findFirst({
        where: { name_json: key },
      });
      if (!stat_type) continue;
      const character_fight_stat = await addCharacterFightStat(
        fight.id,
        character.id,
        stat_type.id,
        value_type.id,
        row[key]
      );
    }
  }
};

const getCharacterByName = async (name) => {
  const character = await prisma.character.findFirst({
    where: { name: name },
  });
  return character;
};

const addCharacter = async (name, account_id, profession_id) => {
  const character = await prisma.character.create({
    data: {
      name: name,
      accountId: account_id,
      professionId: profession_id,
    },
  });
  return character;
};

const addCharacterRaidInfo = async (raid_id, character_id, data) => {
  console.log(`adding ${raid_id}, ${character_id}`);
  const character_raid_info = await prisma.characterRaidInfo.create({
    data: {
      raidId: raid_id,
      characterId: character_id,
      attendance_percentage: data.attendance_percentage,
      duration_active: data.duration_active,
      duration_fights_present: data.duration_fights_present,
      duration_in_combat: data.duration_in_combat,
      normalization_time_allies: data.normalization_time_allies,
      num_fights_present: data.num_fights_present,
      swapped_builds: data.swapped_build,
    },
  });
  return character_raid_info;
};

const addCharacterRaidStat = async (
  raid_id,
  character_id,
  stat_type_id,
  value_type_id,
  value
) => {
  const character_raid_stat = await prisma.characterRaidStat.create({
    data: {
      raidId: raid_id,
      characterId: character_id,
      statTypeId: stat_type_id,
      valueTypeId: value_type_id,
      value: value,
    },
  });
  return character_raid_stat;
};

const addCharacterFightInfo = async (
  fight_id,
  character_id,
  time_active,
  time_in_combat,
  group
) => {
  const character_fight_info = await prisma.characterFightInfo.create({
    data: {
      fightId: fight_id,
      characterId: character_id,
      group: group,
      time_active: time_active,
      time_in_combat: time_in_combat,
    },
  });
  return character_fight_info;
};

const addCharacterFightStat = async (
  raid_id,
  character_id,
  stat_type_id,
  value_type_id,
  value
) => {
  const character_fight_stat = await prisma.characterFightStat.create({
    data: {
      fightId: raid_id,
      characterId: character_id,
      statTypeId: stat_type_id,
      valueTypeId: value_type_id,
      value: value,
    },
  });
  return character_fight_stat;
};

const getAccountByName = async (name) => {
  const account = await prisma.account.findFirst({
    where: { name: name },
  });
  return account;
};

const addAccount = async (name) => {
  const account = await prisma.account.create({
    data: {
      name: name,
    },
  });
  return account;
};

const getProfessionByName = async (name) => {
  const profession = await prisma.profession.findFirst({
    where: { name: name },
  });
  return profession;
};

const addProfession = async (name) => {
  const profession = await prisma.profession.create({
    data: {
      name: name,
    },
  });
  return profession;
};
