import express from "express";
import ResponseApi from "../../js/ResponseApi.js";
import { users } from "./database.js";
import { nanoid } from "nanoid";

const visitor = express.Router();

visitor.get("/:user", async (req, res) => {
  const { user } = req.params;
  const isValid = user in users;

  if (isValid) {
    const pw = users[user];
    const data = await pw.Db.count();
    ResponseApi(req, res, 200, { count: data });
    return;
  }
  ResponseApi(req, res, 400);
});

visitor.post("/:user", async (req, res) => {
  const { ua, browser, engine, os, device, cpu, visitor } = req.body;
  const { user } = req.params;
  const isValid =
    user in users && ua && browser && engine && os && device && cpu && visitor;

  if (isValid) {
    const pw = users[user];

    const data = await pw.insertOne({
      _id: nanoid(),
      ua,
      browser,
      engine,
      os,
      device,
      cpu,
      visitor,
    });
    ResponseApi(req, res, 200, data);
    return;
  }
  ResponseApi(req, res, 400);
});

export default visitor;
