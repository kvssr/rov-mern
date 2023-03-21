import mongoose from "mongoose";

const GuildSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    guildleaderId: {
      type: String,
      required: false,
    },
    apiId: {
      type: String,
      required: false,
    },
    guildleaderApiKey: {
      type: String,
      required: false,
    },
    lastChecked: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Guild = mongoose.model("Guild", GuildSchema);
export default Guild;
