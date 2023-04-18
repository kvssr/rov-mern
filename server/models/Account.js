import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    apiId: {
      type: String,
      required: false,
      min: 2,
      max: 100,
    },
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    world: {
      type: Number,
      required: false,
    },
    guilds: [
      {
        type: String,
        required: false,
      },
    ],
    characters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Character",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", AccountSchema);
export default Account;
