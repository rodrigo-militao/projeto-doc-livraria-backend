'use strict';

const router = require('express').Router();
const db = require('../db');

const { groups } = db;

router.route('/').get((req, res) => {
   groups.findGroupsAndArticles().
      then(groupsResponse => res.json(groupsResponse)).
      catch(err => {
         console.error(err.message);
         res.status(500).json({ error: 'Erro no banco de dados.' });
      });
});

module.exports = router;