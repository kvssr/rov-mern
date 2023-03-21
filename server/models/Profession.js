import mongoose from "mongoose";

const ProfessionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    nameShort: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    color: {
      type: String,
      required: true,
      min: 7,
      max: 7,
    },
  },
  { timestamps: true }
);

const Profession = mongoose.model("Profession", ProfessionSchema);
export default Profession;
