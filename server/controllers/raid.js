import Raid from "../models/Raid.js";

export const getRaid = async (req, res) => {
  try {
    const raids = await Raid.find();
    res.status(200).json(raids);
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
    const raid = await Raid.findByIdAndDelete(raid_id);
    res.status(200).json({ message: "Raid deleted successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
