import mongoose from "mongoose";

const RaidSchema = new mongoose.Schema({
  top_total_players: {
    dmg: Array,
    rips: Array,
    cleanses: Array,
    heal: Array,
    dist: Array,
    stab: Array,
    prot: Array,
    aegis: Array,
    regen: Array,
    heal_from_regen: Array,
    hits_from_regen: Array,
    might: Array,
    fury: Array,
    quick: Array,
    alac: Array,
    speed: Array,
    barrier: Array,
    dmg_taken: Array,
    deaths: Array,
  },
});

const Raid = mongoose.model("Raid", RaidSchema);

export default Raid;
