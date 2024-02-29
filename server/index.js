import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import playerRoutes from "./routes/player.js";
import characterRoutes from "./routes/character.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import raidRoutes from "./routes/raid.js";
import logRoutes from "./routes/log.js";
import accountRoutes from "./routes/account.js";
import guildRoutes from "./routes/guild.js";
import fightRoutes from "./routes/fight.js";
import visitlogRoutes from "./routes/visitlog.js";
import { PrismaClient } from "@prisma/client";

// data imports
import {
  dataStatType,
  dataProfession,
  dataRaidType,
  dataValueType,
  dataBuildType,
  dataRole,
} from "./data/index.js";

const BASEURL = "/server/rov";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json({ limit: "200mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use(BASEURL.concat("/player"), playerRoutes);
app.use(BASEURL.concat("/character"), characterRoutes);
app.use(BASEURL.concat("/general"), generalRoutes);
app.use(BASEURL.concat("/management"), managementRoutes);
app.use(BASEURL.concat("/raid"), raidRoutes);
app.use(BASEURL.concat("/log"), logRoutes);
app.use(BASEURL.concat("/account"), accountRoutes);
app.use(BASEURL.concat("/guild"), guildRoutes);
app.use(BASEURL.concat("/fight"), fightRoutes);
app.use(BASEURL.concat("/visitlog"), visitlogRoutes);

/* PRISMA */
export const prisma = new PrismaClient();

const createManyStatT = await prisma.statType.createMany({
  data: dataStatType,
  skipDuplicates: true,
});
const createManyRaidT = await prisma.raidType.createMany({
  data: dataRaidType,
  skipDuplicates: true,
});
const createManyValueT = await prisma.valueType.createMany({
  data: dataValueType,
  skipDuplicates: true,
});
// const createManyProf = await prisma.profession.createMany({
//   data: dataProfession,
//   skipDuplicates: true,
// });
for (const data of dataProfession) {
  const updateProf = await prisma.profession.update({
    where: {
      name: data.name,
    },
    data: data,
  });
}
const createManyBuildT = await prisma.buildType.createMany({
  data: dataBuildType,
  skipDuplicates: true,
});
const createManyAccountRole = await prisma.accountRole.createMany({
  data: dataRole,
  skipDuplicates: true,
});

const PORT = process.env.PORT || 9000;
const server = app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
