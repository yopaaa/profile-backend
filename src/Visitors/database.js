import Database from "../../js/dbMethod.js";

const schema = {
  ua: String,
  browser: Object,
  engine: Object,
  os: Object,
  device: Object,
  cpu: Object,
  _id: String,
  visitor: Object,
};
const users = {
  yopaaa: new Database("visitors-yopaaa", schema),
};

export {schema, users}