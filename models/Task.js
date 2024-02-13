module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    self: {
      type: DataTypes.STRING,
    },
    key: {
      type: DataTypes.STRING,
    },
    summary: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("To Do", "In Progress", "Done"),
    },
    priority: {
      type: DataTypes.ENUM("Low", "Medium", "High"),
    },
    issueType: {
      type: DataTypes.ENUM("Story", "Task", "Epic"),
    },
    assignee: {
      type: DataTypes.STRING,
    },
    parentId: {
      type: DataTypes.INTEGER,
    },
    parentSummary: {
      type: DataTypes.STRING,
    },
    created: {
      type: DataTypes.DATE,
    },
    dueDate: {
      type: DataTypes.DATE,
    },
  });

  return Task;
};
