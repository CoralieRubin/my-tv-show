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
  connection.query('INSERT INTO showtv SET ?', newShow, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error saving a new show');
    } else {
      res.sendStatus(200);
    }
  });
});
//en tant qu'utilisateur, je veux pouvoir consulter une serie en renseignant son id dans l'url .

router.get('/:showId', (req, res) => {
  const getOneShow = Number(req.params.showId);
  connection.query(
    'SELECT * FROM showtv WHERE id = ?;',
    [getOneShow],
    (err, results) => {
      console.log(err);
      if (err) {
        res.status(500).send('Error getting this particulary show');
      } else {
        res.json(results);
      }
    },
  );
});

//en tant qu'utilisateur, je veux pouvoir supprimer une playlist.

router.delete('/:id', (req, res) => {
  const idShow = req.params.id;
  connection.query('DELETE FROM showtv WHERE id=?', [idShow], err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error deleting show');
    } else {
      res.sendStatus(200);
    }
  });
});

//en tant qu'utilisateur, je veux pouvoir modifier une playlist.

router.put('/:id', (req, res) => {
  const newdata = req.body;
  const idShow = req.params.id;
  connection.query('UPDATE showtv SET ? WHERE id=?', [newdata, idShow], err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error updating show');
    } else {
      res.sendStatus(200);
    }
  });
});

router.get('/', (req, res) => {
  let sql = 'SELECT * FROM showtv';
  const sqlValues = [];

  if (req.query.note_imdb) {
    sql += ' WHERE note_imdb > ?';
    sqlValues.push(req.query.genre);
  }

  if (req.query.name) {
    sql += ' WHERE name = ?';
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
