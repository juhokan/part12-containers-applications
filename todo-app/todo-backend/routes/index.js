const express = require('express');
const redis = require('../redis')
const router = express.Router();

const configs = require('../util/config')

router.get("/", async (_req, res) => {
  const visits = (await redis.getAsync("visits")) || 0
  redis.setAsync("visits", parseInt(visits) + 1)
  res.send({...configs, visits: parseInt(visits)})
})

router.get("/statistics", async (_req, res) => {
  const todos = (await redis.getAsync("todos")) || 0
  res.send({ added_todos: parseInt(todos) })
})

module.exports = router;
