const { Task } = require("../models");

const taskProvider = {
  async createTask(task) {
    return Task.create(task);
  },
  async getTasks() {
    return Task.findAll();
  },
  async getTask(id) {
    return Task.findByPk(id);
  },
  async updateTask(id, task) {
    return Task.update(task, {
      where: {
        id,
      },
    });
  },
  async deleteAllTasks() {
    return Task.destroy({
      where: {},
      truncate: true,
    });
  },
  async deleteTask(id) {
    return Task.destroy({
      where: {
        id,
      },
    });
  },
};

module.exports = taskProvider;
