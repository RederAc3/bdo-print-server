import express from 'express';
import generateUrlPrinter from './functions/generateUrlPrinter.js'

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json())

generateUrlPrinter()

app.all('*', (req, res) => {
    res.json({status: 'error', message: 'WRONG REQUEST'})
});

app.listen(3010);