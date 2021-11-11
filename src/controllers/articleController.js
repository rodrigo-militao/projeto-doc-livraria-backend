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
      then(article => {
         if (!article) return res.status(404).json({ error: 'Artigo não encontrado.' });
         articles.increaseRelevance(id);
         return res.json(article);         
      }).
      catch(err => {
         console.error(err.message);
         return res.status(500).json({ error: 'Erro no banco de dados.' });
      });
});

router.route('/').post((req, res) => {
   articles.insert(req.body).
      then(() => res.json({ status: 'ok' })).
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

router.route('/search/:search').get((req, res) => {
   const { search } = req.params;

   articles.search(search).
      then(response => res.json(response)).
      catch(err => {
         console.error(err.message);
         return res.status(500).json({ error: 'Erro no banco de dados.' });
      });
});

module.exports = router;