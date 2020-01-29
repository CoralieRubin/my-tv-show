const express = require('express');

const bodyParser = require('body-parser');
const connection = require('../conf');

const router = express.Router({ mergeParams: true });

router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

//en tant qu'utilisateur, je veux créer et affecter un morceau à une playlist

router.post('/', (req, res) => {
  const newSong = req.body;
  connection.query('INSERT INTO track SET ? ', newSong, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error saving a new track');
    } else {
      res.sendStatus(200);
    }
  });
});

//en tant qu'utilisateur, je veux lister tous les morceaux d'une playlist.

router.get('/:playlistId', (req, res) => {
  const getOnePlaylist = Number(req.params.playlistId);
  connection.query(
    'SELECT * FROM track WHERE playlist_id = ?;',
    [getOnePlaylist],
    (err, results) => {
      console.log(err);
      if (err) {
        res.status(500).send('Error getting this particulary track');
      } else {
        res.json(results);
      }
    },
  );
});

router.get('/tracks', (req, res) => {
  connection.query('SELECT * FROM track;', (err, results) => {
    console.log(err);
    if (err) {
      res.status(500).send('Error getting all tracks');
    } else {
      res.json(results);
    }
  });
});

//tous les morceaux (/tracks), indépendamment de la playlist à laquelle ils sont associés.

module.exports = router;
