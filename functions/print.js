import { execSync } from "child_process";

const print = file => {
    return execSync(`lp ${file}`);
}

export default print;