import { readFileSync, writeFileSync } from 'fs';
import { randomBytes } from 'crypto';

const generateSocketId = () => {

    let rawConfig = readFileSync('./config.json');
    let config = JSON.parse(rawConfig);
    const socketId = randomBytes(5).toString('hex').toUpperCase();

    if (!config.ID) {
        config.ID = socketId;
        let data = JSON.stringify(config);

        writeFileSync('./config.json', data);
        console.log(data);
        return config.ID
    }
    return config.ID
}

export default generateSocketId;