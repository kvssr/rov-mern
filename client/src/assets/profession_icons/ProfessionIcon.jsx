import Berserker from "./Berserker.png";
import Bladesworn from "./Bladesworn.png";
import Catalyst from "./Catalyst.png";
import Chronomancer from "./Chronomancer.png";
import Daredevil from "./Daredevil.png";
import Deadeye from "./Deadeye.png";
import Dragonhunter from "./Dragonhunter.png";
import Druid from "./Druid.png";
import Firebrand from "./Firebrand.png";
import Harbinger from "./Harbinger.png";
import Herald from "./Herald.png";
import Holosmith from "./Holosmith.png";
import Mechanist from "./Mechanist.png";
import Mesmer from "./Mesmer.png";
import Mirage from "./Mirage.png";
import Reaper from "./Reaper.png";
import Renegade from "./Renegade.png";
import Scourge from "./Scourge.png";
import Scrapper from "./Scrapper.png";
import Soulbeast from "./Soulbeast.png";
import Specter from "./Specter.png";
import Spellbreaker from "./Spellbreaker.png";
import Tempest from "./Tempest.png";
import Untamed from "./Untamed.png";
import Vindicator from "./Vindicator.png";
import Virtuoso from "./Virtuoso.png";
import Weaver from "./Weaver.png";
import Willbender from "./Willbender.png";

const iconList = {
  Berserker: Berserker,
  Bladesworn: Bladesworn,
  Catalyst: Catalyst,
  Chronomancer: Chronomancer,
  Daredevil: Daredevil,
  Deadeye: Deadeye,
  Dragonhunter: Dragonhunter,
  Druid: Druid,
  Firebrand: Firebrand,
  Harbinger: Harbinger,
  Herald: Herald,
  Holosmith: Holosmith,
  Mechanist: Mechanist,
  Mesmer: Mesmer,
  Mirage: Mirage,
  Reaper: Reaper,
  Renegade: Renegade,
  Scourge: Scourge,
  Scrapper: Scrapper,
  Soulbeast: Soulbeast,
  Specter: Specter,
  Spellbreaker: Spellbreaker,
  Tempest: Tempest,
  Untamed: Untamed,
  Vindicator: Vindicator,
  Virtuoso: Virtuoso,
  Weaver: Weaver,
  Willbender: Willbender,
};

const ProfessionIcon = (prof, size = 50) => {
  const icon = iconList[prof];
  return (
    <img
      src={icon}
      alt={prof}
      width={size}
      height={size}
    ></img>
  );
};

export default ProfessionIcon;
