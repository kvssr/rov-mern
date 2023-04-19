import Raid from "../models/Raid.js";
import { prisma } from "../index.js";

export const getRaid = async (req, res) => {
  try {
    const raids = await prisma.raid.findMany({ include: { raidType: true } });
    res.status(200).json(raids);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getRaidDetailsById = async (req, res) => {
  try {
    const raid_id = Number(req.params.id);
    const stat_type = req.params.stat;
    console.log("server getRaidDetailsById raid_id", raid_id);
    console.log("server getRaidDetailsById stat", stat_type);
    if (raid_id === "-1") return res.status(200).json("");
    const characters = await prisma.character.findMany({
      where: {
        characterRaidStats: {
          some: {
            raidId: raid_id,
          },
        },
      },
      select: {
        name: true,
        profession: true,
        account: true,
        characterRaidStats: {
          where: {
            raidId: raid_id,
            statType: {
              name_json: stat_type,
            },
          },
          orderBy: { value: "desc" },
        },
      },
    });

    console.log("server getRaidById raid", raid_id);
    // console.log("server getRaidById raid", raid);
    console.log("server getRaidsdasdasdBasdasdayId raid");
    res.status(200).json(characters);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getRaidById = async (req, res) => {
  try {
    const raid_id = req.params.id;
    console.log("server getRaidById raid_id", raid_id);
    if (raid_id === "-1") return res.status(200).json("");
    const raid = await Raid.findById(raid_id);
    console.log("server getRaidById raid", raid_id);
    res.status(200).json(raid);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const checkRaidByDateAndTime = async (req, res) => {
  try {
    const start_date = req.params.start_date;
    const start_time = req.params.start_time;
    const raid = await Raid.findOne({
      // overall_raid_stats: { start_date: start_date, start_time: start_time },
      "overall_raid_stats.start_date": start_date,
      "overall_raid_stats.start_time": start_time,
    }).exec();
    const exists = true ? raid : false;
    res.status(200).json(exists);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteRaid = async (req, res) => {
  try {
    const raid_id = req.params.id;
    console.log("deleteRaid params", req.params);
    console.log("Deleting raid", raid_id);
    const raid = await prisma.raid.delete({
      where: { id: parseInt(raid_id, 10) },
    });
    res.status(200).json({ message: "Raid deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

export const getListRaidsInfo = async (req, res) => {
  try {
    // const raids = await Raid.find(null, "_id overall_raid_stats");
    const raids = await prisma.raid.findMany();
    res.status(200).json(raids);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getRaidTypes = async (req, res) => {
  try {
    const raidTypes = await prisma.raidType.findMany();
    res.status(200).json(raidTypes);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
