import Raid from "../models/Raid.js";

export const getRaid = async (req, res) => {
  try {
    const raids = await Raid.find();
    res.status(200).json(raids);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
