import { readFileSync, writeFileSync } from "fs";

const addConfig = value => {
  const rawConfig = readFileSync("./config.json"),
        config = JSON.parse(rawConfig),
        data = JSON.stringify({ ...config, ...value });

  writeFileSync("./config.json", data);
};

export default addConfig;
