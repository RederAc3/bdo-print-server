import express from 'express';
import axios from 'axios';

import generateUrlPrinter from './functions/generateUrlPrinter.js'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

generateUrlPrinter();

const isAuthorized = async (req, res, next) => {
    const token = req.headers.authorization;
    let config = {
        headers: {
            accept: "application/json",
            ContentType: "application/json",
            Authorization: token
        },
    };

    let data = {
        code: '17 04 05'
    }
    
    if (token) {
        try {
            await axios.post('https://test-bdo.mos.gov.pl/api/WasteRegister/v1/WasteCode/search', data, config)
            next()
        } catch (error) {
            const message = error.response.status === 401 ? 'WRONG TOKEN' : 'UNKNOWN ERROR';
            res.json({status: 'error', message})
        }
    }
}

app.post('/printers/:uuid', isAuthorized, (req, res) => {
    res.json({ uuid: req.params.uuid })
});

app.post('/printers/:uuid/print', isAuthorized, (req, res) => {
    res.json({ status: 'printed' })
});

app.all('*', (req, res) => {
    res.json({ status: 'error', message: 'WRONG REQUEST' })
});

app.listen(3010);