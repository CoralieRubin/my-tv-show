const express = require('express');
const bodyParser = require('body-parser');
// const playlistRouter = require('./routes/playlist');
// const trackRouter = require('./routes/track');

const connection = require('./conf');

const app = express();

app.use(bodyParser.json());

// app.use('/api/playlist', playlistRouter);
// app.use('/api/track', trackRouter);
app.get('/', (req, res) => res.send('Ok ca marche sur index.js back'));

app.listen(process.env.PORT || 5000);
