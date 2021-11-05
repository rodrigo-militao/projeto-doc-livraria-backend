const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require("./db");

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(bodyParser.json())

const PORT = 5001

app.get('/', (req, res) => {
    db.findAllArticles()
        .then(articles => {
            res.json(articles)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
});

app.get('/:id', (req, res) => {
  const { id } = req.params
  db.findArticle(id)
      .then(article => {
          res.json(article)
      })
      .catch(err => {
          res.status(500).json({ error: err.message })
      })
});

app.post('/', (req, res) => {
    const { title, content } = req.body
    db.createArticle(title, content)
        .then(article => {
            res.json(article)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
});

app.put('/:id', (req, res) => {
  const { title, content } = req.body
  const { id } = req.params
  db.updateArticle(id, {title, content})
    .then(article => {
      res.json(article)
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
});

app.delete('/:id', (req, res) => {
    const { id } = req.params
    db.deleteArticle(id)
        .then(() => {
            res.json({ message: 'Article deleted' })
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
});



app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});