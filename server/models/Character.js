import mongoose from "mongoose";

const CharacterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    professionId: String,
    accountId: String,
  },
  { timestamps: true }
).index({ name: 1, profession: 1 }, { unique: true });

const Character = mongoose.model("Character", CharacterSchema);

export default Character;
