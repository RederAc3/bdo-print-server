import { io } from "socket.io-client";
import qrcode from "qrcode-terminal";

import generateSocketId from "./functions/generateSocketId.js";
import getPrinterName from "./functions/getPrinterName.js";

const socketId = generateSocketId();

const client = io("http://api.rdnt.pl:5420");

client.on("connect", () => {
    console.log("Połączono z serwerem");
    qrcode.generate(socketId, { small: true });
    console.log(`Wpisz kod połączenia w aplikacji mobilnej: ${socketId}`);
    client.emit("id", socketId);
});

client.on(`${socketId}/config`, (user) => {

    console.log(`Drukarka podłączona do konta ${user}`);

    const resConfig = {
        socketId,
        config: true,
        printerName: getPrinterName()
    };

    client.emit(`config`, resConfig);
});

client.on(`${socketId}/print`, (url) => {
    console.log(`Drukownaie pliku ${url}`);

    const resPrint = {
        printerName: getPrinterName(),
        printed: true
    };
    client.emit(`print`, resPrint);
});
