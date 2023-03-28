import Raid from "../models/Raid.js";

export const postLog = async (req, res) => {
  try {
    // Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo)
    // console.log("BODY", req.);
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
      const raid = Raid.create(req.body);
      console.log("Raid added", raid["_id"]);
    }
  } catch (err) {
    console.log("server, postLog data error", err);
    res.status(404).json({ message: err.message });
  }
};
