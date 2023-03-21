import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    guild: {
      type: String,
      required: false,
    },
    characters: Array,
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", AccountSchema);
export default Account;
