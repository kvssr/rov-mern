import mongoose from "mongoose";

const CharacterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    profession: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    buildType: {
      type: String,
      required: false,
      min: 2,
      max: 100,
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: false,
    },
    raids: [
      {
        raid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Raid",
          required: true,
        },
        startDate: {
          type: String,
          required: true,
        },
        startTime: {
          type: String,
          required: true,
        },
        attendance_percentage: Number,
        duration_active: Number,
        duration_fights_present: Number,
        duration_in_combat: Number,
        num_fights_present: Number,
        swapped_build: Boolean,
        total_stats: {},
        average_stats: {},
        consistency_stats: {},
        portion_top_stats: {},
        stats_per_fight: {},
      },
    ],
  },
  { timestamps: true }
).index({ name: 1, profession: 1 }, { unique: true });

const Character = mongoose.model("Character", CharacterSchema);

export default Character;
