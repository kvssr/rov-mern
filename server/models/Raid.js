import mongoose from "mongoose";

const RaidSchema = new mongoose.Schema({
  overall_raid_stats: {},
  overall_squad_stats: {},
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
  fights: [],
  players: [],
  top_average_players: {},
  top_consistent_players: {},
  top_percentage_players: {},
  top_late_players: {},
  top_jack_of_all_trades_players: {},
});

const Raid = mongoose.model("Raid", RaidSchema);

export default Raid;
