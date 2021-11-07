const router = require('express').Router();
const db = require('../db');

const { articles } = db

router.route('/').get((req, res) => {
  articles.findAll()
    .then(articles => res.json(articles))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.route('/:id').get((req, res) => {
  const { id } = req.params;

  articles.findByUrl(id)
    .then(article => res.json(article))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.route('/').post((req, res) => {
  articles.insert(req.body)
    .then(response => res.json(response))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.route('/').put((req, res) => {
  articles.update(req.body)
    .then(article => res.json(article))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.route('/:id').delete((req, res) => {
  const { id } = req.params;
  articles.delete(id)
    .then(response => res.json(response))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
