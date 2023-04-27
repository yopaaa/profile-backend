import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
// import cors from "cors";
import "dotenv/config";

import Visitors from "./src/Visitors/Visitors.js";
import LogASCIIText from "./js/ASCIIArt.js";
import ResponseApi from "./js/ResponseApi.js";
// import log from "./js/log.js";

const { MAIN_PORT, WHITE_LIST_CORS, FRONT_END_PATH, NODE_ENV } = process.env;
const app = express();
// const whitelist = WHITE_LIST_CORS.split(",");
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (NODE_ENV == "development" || origin == undefined) {
//       callback(null, true);
//       return;
//     }

//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
// app.use(cors(corsOptions));

// app.use("/pw_v1", authentication, pw_v1);
app.use("/visitors", Visitors);

app.all("/", async (req, res) => {
  ResponseApi(req, res, 200);
});

app.all("/ping", async (req, res) => {
  ResponseApi(req, res, 200, { msg: "pong" });
});

app.use((err, req, res, next) => {
  const { message } = err;
  ResponseApi(req, res, 503, {}, [message]);
});

app.use("/", (req, res) => {
  ResponseApi(req, res, 404);
});

// -----------------------------START SERVER-----------------------------
app.listen(MAIN_PORT, "0.0.0.0", () => {
  LogASCIIText("RILL CUY");
});
