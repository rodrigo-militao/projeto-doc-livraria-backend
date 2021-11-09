'use strict';

const router = require('express').Router();
const db = require('../db');

const { articles } = db;

router.route('/').get((req, res) => {
   articles.findAll().
      then(articlesResponse => res.json(articlesResponse)).
      catch(err => {
         console.error(err.message);
         return res.status(500).json({ error: 'Erro no banco de dados.' });
      });
});

router.route('/:id').get((req, res) => {
   const { id } = req.params;

   articles.findByUrl(id).
      then(article => res.json(article)).
      catch(err => {
         console.error(err.message);
         return res.status(500).json({ error: 'Erro no banco de dados.' });
      });
});

router.route('/').post((req, res) => {
   articles.insert(req.body).
      then(response => res.json({ status: 'ok' })).
      catch(err => {
         console.error(err.message);
         return res.status(500).json({ error: 'Erro no banco de dados.' });
      });
});

router.route('/').put((req, res) => {
   articles.update(req.body).
      then(article => res.json(article)).
      catch(err => {
         console.error(err.message);
         return res.status(500).json({ error: 'Erro no banco de dados.' });
      });
});

router.route('/:id').delete((req, res) => {
   const { id } = req.params;

   articles.delete(id).
      then(response => res.json(response)).
      catch(err => {
         console.error(err.message);
         return res.status(500).json({ error: 'Erro no banco de dados.' });
      });
});

module.exports = router;