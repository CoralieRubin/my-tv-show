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

//en tant qu'utilisateur, je veux pouvoir créer une nouvelle serie.
router.post('/', (req, res) => {
  const newShow = req.body;
  connection.query('INSERT INTO playlist SET ?', newSong, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error saving a new song');
    } else {
      res.sendStatus(200);
    }
  });
});
//en tant qu'utilisateur, je veux pouvoir consulter une playlist en renseignant son id dans l'url (juste ses données propres, pas les pistes associées).

router.get('/:playlistId', (req, res) => {
  const getOnePlaylist = Number(req.params.playlistId);
  connection.query(
    'SELECT * FROM playlist WHERE id = ?;',
    [getOnePlaylist],
    (err, results) => {
      console.log(err);
      if (err) {
        res.status(500).send('Error getting this particulary playlist');
      } else {
        res.json(results);
      }
    },
  );
});

//en tant qu'utilisateur, je veux pouvoir supprimer une playlist.

router.delete('/:id', (req, res) => {
  const id_song = req.params.id;
  connection.query('DELETE FROM playlist WHERE id=?', [id_song], err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error deleting playlist');
    } else {
      res.sendStatus(200);
    }
  });
});

//en tant qu'utilisateur, je veux pouvoir modifier une playlist.

router.put('/:id', (req, res) => {
  const newdata = req.body;
  const id_playlist = req.params.id;
  connection.query(
    'UPDATE playlist SET ? WHERE id=?',
    [newdata, id_playlist],
    err => {
      if (err) {
        console.log(err);
        res.status(500).send('Error updating playlist');
      } else {
        res.sendStatus(200);
      }
    },
  );
});

router.get('/', (req, res) => {
  let sql = 'SELECT * FROM playlist';
  const sqlValues = [];

  //GET (light) - Récupération de quelques champs spécifiques (id, names, dates, etc...)
  if (req.query.genre) {
    sql += ' WHERE genre =?';
    sqlValues.push(req.query.genre);
  }

  if (req.query.name) {
    sql += ' WHERE name =?';
    sqlValues.push(req.query.name);
  }

  connection.query(sql, sqlValues, (err, results) => {
    if (err) {
      res.status(500).send(`An error occurred: ${err.message}`);
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
