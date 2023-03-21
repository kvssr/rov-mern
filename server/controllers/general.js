import Account from "../models/Account.js";

export const getAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findById(id);
    res.status(200).json(account);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
