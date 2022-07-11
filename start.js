import { io } from "socket.io-client";
import qrcode from "qrcode-terminal";

import generateSocketId from "./functions/generateSocketId.js";
import getPrinterName from "./functions/getPrinterName.js";
import addConfig from "./functions/addConfig.js";
import getConfig from "./functions/getConfig.js";

let socketId = getConfig("ID");

if (!socketId) {
    socketId = generateSocketId();
    qrcode.generate(socketId, { small: true });
    console.log(
        `Zeskanuj kod QR w aplikacji mobilnej lub wpisz hasło parowania: ${socketId}`
    );
}

const client = io("http://api.rdnt.pl:5420");

client.on("connect", () => {
    console.log("Połączono z serwerem");
    client.emit("id", socketId);
});

client.on(`${socketId}/config`, (user) => {
    const printerName = getPrinterName();

    getConfig({ printerName }) ? addConfig({ printerName }) : null
    getConfig({ user }) ? addConfig({ user }) : null

    console.log(`Drukarka podłączona do konta ${user}`);
    const resConfig = {
        socketId,
        config: true,
        printerName
    };

    client.emit(`config`, resConfig);
});

client.on(`${socketId}/print`, (url) => {
    const user = getConfig({ user })
    let resPrint = {}

    if (user) {
        console.log(`Drukownaie pliku ${url}`);

        resPrint = {
            printerName: getConfig('printerName'),
            printed: true
        };
    } else resPrint = { message: 'unconfigured', printed: false };

    client.emit(`print`, resPrint);
});
