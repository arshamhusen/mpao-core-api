const TaskController = {
  async create(req, res) {
    const task = await req.context.taskProvider.createTask(req.body);
    return res.status(201).json(task);
  },
};

module.exports = TaskController;
