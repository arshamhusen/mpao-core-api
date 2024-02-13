"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable("tasks", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      self: {
        type: Sequelize.STRING,
      },
      key: {
        type: Sequelize.STRING,
      },
      summary: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("To Do", "In Progress", "Done"),
      },
      priority: {
        type: Sequelize.ENUM("Low", "Medium", "High"),
      },
      issueType: {
        type: Sequelize.ENUM("Story", "Task", "Epic"),
      },
      parentId: {
        type: Sequelize.INTEGER,
      },
      parentSummary: {
        type: Sequelize.STRING,
      },
      assignee: {
        type: Sequelize.STRING,
      },
      created: {
        type: Sequelize.DATE,
      },
      dueDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable("tasks");
  },
};
