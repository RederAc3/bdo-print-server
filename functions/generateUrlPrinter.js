import fs from 'fs';
import { randomUUID } from 'crypto'

const generateUrlPrinter = () => {

    let rawConfig = fs.readFileSync('config.json');
    let config = JSON.parse(rawConfig);

    if (!config.url) {
        config.url = `https://bdo.rdnt.pl/printers/${randomUUID()}`;

        let data = JSON.stringify(config);
        fs.writeFileSync('config.json', data);
        console.log(`Zdalny adres drukarki: ${config.url}`);
    }
} 

export default generateUrlPrinter;