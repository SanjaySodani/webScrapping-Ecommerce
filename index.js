const express = require('express');
const app = express();
const cors = require('cors');
const { dbUrl, MongoClient } = require('./dbConfig');
const { getDataFromAmazon, getDataFromFlipkart } = require('./request');

getDataFromAmazon();
getDataFromFlipkart();

setInterval(function () {
    let date = new Date();
    if ((date.getHours() === 12 || date.getHours() === 0) && date.getMinutes() === 0) {
        getDataFromAmazon();
        getDataFromFlipkart();
    }
}, 60000); //executes every minute

app.use(cors());

app.get('/', async (req, res) => {
    let client = await MongoClient.connect(dbUrl);
    try {
        let db = await client.db('test');
        let document = await db.collection('products').find().toArray();

        res.status(200).json(document);
    } catch (error) {
        res.json({ message: 'Internal server error' });
    } finally {
        client.close();
    }
});

app.listen(process.env.PORT || 3000);