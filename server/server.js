require('dotenv').config();
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();

const { sendMessage, sendEvent } = require('./lib/dialogflow');


app.prepare().then(() => {

  const server = express();
// parse the body
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.post('/dialogflow/query', async (req, res) => {
    const payload = await sendMessage(req.body.message);
    res.json(payload);
  });

  server.post('/dialogflow/event', async (req, res) => {
    const payload = await sendEvent(req.body.event);
    res.json(payload);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})