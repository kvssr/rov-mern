import Raid from "../models/Raid.js";

export const postLog = async (req, res) => {
  try {
    console.log(req.params);
    // const logs = await Raid.find();
    // res.status(200).json(raids);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
