import { exec } from "child_process";

export const printBdo = (file) => {
    exec(`lp ../files/${file}`, (error, stdout, stderr) => {
        if (error) {
            return error;
        }

        if (stderr) {
            return stderr;
        }

        return stdout;
    });
};