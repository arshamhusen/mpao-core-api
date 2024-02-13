const taskProvider = require("../providers/task.provider");
const { fetchInitData } = require("../services/fetch-initial-data");

var router = require("express").Router();

router.get("/", async (req, res) => {
  const tasks = await taskProvider.getTasks();
  return res.json(tasks);
});

router.get("/all", async (req, res) => {
  const tasks = await taskProvider.getAll();
  return res.json(tasks);
});

router.get("/refresh", async (req, res) => {
  await fetchInitData();
  res.send("Data refreshed");
});

module.exports = router;
