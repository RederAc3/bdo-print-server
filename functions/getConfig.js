import { readFileSync } from "fs";

const getConfig = (value) => {
  const rawConfig = readFileSync("./config.json");
  const config = JSON.parse(rawConfig);
  const test = Object.keys(config);
  const filtered = test.filter((item) => item.includes(value));
  const object = filtered.reduce((obj, key) => {
    return Object.assign(obj, { val: config[key] });
  }, {});
  
  return object.val;
};

export default getConfig;
