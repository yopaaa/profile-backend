import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import Visitors from "./src/Visitors/Visitors.js";
import LogASCIIText from "./js/ASCIIArt.js";
import ResponseApi from "./js/ResponseApi.js";
import Visitors from "./src/Visitors/Visitors.js";
import "dotenv/config";

const { MAIN_PORT } = process.env;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

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

app.listen(MAIN_PORT, "0.0.0.0", () => {
  LogASCIIText("RILL CUY");
});
