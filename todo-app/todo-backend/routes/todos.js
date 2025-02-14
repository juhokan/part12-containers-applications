const express = require('express');
const { Todo } = require('../mongo')
const redis = require('../redis')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todos = (await redis.getAsync("todos")) || 0
  redis.setAsync("todos", parseInt(todos) + 1)
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo by ID. */
singleRouter.get('/', async (req, res) => {
  try {
    res.send(req.todo);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

/* PUT todo by ID. */
singleRouter.put('/', async (req, res) => {
  try {
    req.todo.text = req.body.text;
    req.todo.done = req.body.done;
    await req.todo.save();
    res.send(req.todo);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
