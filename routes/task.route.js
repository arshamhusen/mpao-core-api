var router = require("express").Router();

router.post("/tasks", async (req, res) => {
  const task = await req.context.taskProvider.createTask(req.body);
  return res.status(201).json(task);
});

router.get("/", async (req, res) => {
  const tasks = await req.context.taskProvider.getTasks();
  return res.json(tasks);
});

module.exports = router;
