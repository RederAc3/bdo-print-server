import { execSync } from "child_process";

const getPrinterName = () => {
    return execSync("lpstat -e").toString().trim();
};

export default getPrinterName;
