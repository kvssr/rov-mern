import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import playerRoutes from "./routes/player.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import raidRoutes from "./routes/raid.js";
import logRoutes from "./routes/log.js";

// data imports
import Account from "./models/Account.js";
import { dataAccount } from "./data/index.js";

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
app.use("/player", playerRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/raid", raidRoutes);
app.use("/log", logRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD ONCE */
  })
  .catch((error) => console.log(`${error} did not connect`));
