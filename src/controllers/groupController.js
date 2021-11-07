const router = require('express').Router();
const db = require('../db');

const { groups } = db

router.route('/').get((req, res) => {
  groups.findAll()
    .then(groups => res.json(groups))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
