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

//en tant qu'utilisateur, je veux créer et affecter un épisode à une serie

router.post('/', (req, res) => {
  const newEpisode = req.body;
  connection.query('INSERT INTO episode SET ? ', newEpisode, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error saving a new Episode');
    } else {
      res.sendStatus(200);
    }
  });
});

//en tant qu'utilisateur, je veux lister tous les épisode d'une série.

// router.get('/:showtId', (req, res) => {
//   const getOneEpisode = Number(req.params.showId);
//   connection.query(
//     'SELECT * FROM episode WHERE show_id = ?;',
//     [getOneEpisode],
//     (err, results) => {
//       console.log(err);
//       if (err) {
//         res.status(500).send('Error getting this particulary epsiode');
//       } else {
//         res.json(results);
//       }
//     },
//   );
// });

router.get('/', (req, res) => {
  connection.query('SELECT * FROM episode;', (err, results) => {
    console.log(err);
    if (err) {
      res.status(500).send('Error getting all episode');
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
