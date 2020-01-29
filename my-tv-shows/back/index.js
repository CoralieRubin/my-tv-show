const express = require('express');
const bodyParser = require('body-parser');
const showRouter = require('./routes/show');
const episodeRouter = require('./routes/episode');

const connection = require('./conf');

const app = express();

app.use(bodyParser.json());

app.use('/api/show', showRouter);
app.use('/api/episode', episodeRouter);
app.get('/', (req, res) => res.send('Ok ca marche sur index.js back'));

app.listen(process.env.PORT || 5000);
