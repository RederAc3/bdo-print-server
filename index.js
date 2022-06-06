import express from 'express';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.all('*', (req, res) => {
    res.json({status: 'error', message: 'WRONG REQUEST'})
});

app.listen(3001);