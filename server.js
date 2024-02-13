const express = require("express");
const server = express();
const port = 4000;

require("dotenv").config();

const cors = require("cors");
const { Axios } = require("axios");
const taskProvider = require("./providers/task.provider");
server.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

server.use(express.json());

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  fetchInitData();
});

async function fetchInitData() {
  console.log("fetching data");

  let tasks = await fetch(
    "https://arova.atlassian.net/rest/api/2/search?jql=project%3D10006&fields=summary,issuetype,parent,created,priority,status,duedate,assignee&createdat=2024-02-13T09%3A43%3A09.078%2B0500&status",
    {
      method: "GET",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.JIRA_USER}:${process.env.JIRA_TOKEN}`
          ).toString("base64"),
      },
    }
  );
  tasks = await tasks.json();
  // delete all tasks
  await taskProvider.deleteAllTasks();
  await Promise.all(
    tasks.issues.map(async (task) => {
      const taskData = {
        id: task.id,
        self: task.self,
        key: task.key,
        summary: task.fields?.summary,
        status: task.fields.status.name,
        priority: task.fields.priority.name,
        issueType: task.fields.issuetype?.name,
        assignee: task.fields.assignee?.displayName,
        parentId: task.fields.parent?.id,
        parentSummary: task.fields.parent?.fields?.summary,
        created: task.fields.created,
        dueDate: task.fields.duedate,
      };

      await taskProvider.createTask(taskData);
      console.log("task created");
    })
  );
}

server.get("/api/v1/", async (req, res) => {
  res.send("Hello World!");
});

server.get("/tasks", async (req, res) => {
  const tasks = await taskProvider.getTasks();
  return res.json(tasks);
});

server.get("/", async (req, res) => {
  res.send("Hello World!");
});

// use prefix for all routes

server.use("/tasks", require("./routes/task.route"));
