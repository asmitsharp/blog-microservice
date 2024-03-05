const express = require('express');
const body_parser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors')
const axios = require('axios')

const app = express();
app.use(body_parser.json());
app.use(cors())

const comments_by_id = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(comments_by_id[req.params.id])
});

app.post('/posts/:id/comments',async (req, res) => {
  const comment_id = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = comments_by_id[req.params.id] || [] ;
  comments.push({id: comment_id, content});
  comments_by_id[req.params.id] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: comment_id,
      content,
      postId: req.params.id,
    }
  }).catch((err) => {
    console.log(err)
  })

  res.status(201).send(comments);
});

app.post('/events', (req, res) => {
  console.log('Event Recieved', req.body.type)

  res.send({})
})

app.listen(4001, () => {
  console.log('Listening on 4001...');
});
