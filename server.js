const express = require("express");
const server = express();
const port = 4000;
const cron = require("node-cron");

require("dotenv").config();

const cors = require("cors");

const { fetchInitData } = require("./services/fetch-initial-data");
const moment = require("moment");
const { emailSender } = require("./services/email-sender");
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

server.get("/api/v1/", async (req, res) => {
  res.send("Hello World!");
});

server.get("/", async (req, res) => {
  res.send("Hello World!");
});

// use prefix for all routes

server.use("/tasks", require("./routes/task.route"));

// cron schedule every 5 seconds
cron.schedule("*/5 * * * * *", async () => {
  await pendingTasks();
});

async function pendingTasks() {
  c;
  const tasks = await taskProvider.getTasks();
  const today = moment().format("YYYY-MM-DD");
  const dueTasks = tasks.filter((task) => {
    return moment(task.dueDate).format("YYYY-MM-DD").before(today);
  });

  await emailSender({
    email: "arushamhussain@icloud.com",
    subject: "Pending Tasks",
    message: `<html>
  <head>
    <title>gig-html</title>
  </head>
  <body>
    <h1>Pending Tasks</h1>
    <p>Hi Arusham,</p>
    <div style="margin-top: 10px; padding: 10px; background-color: #f5f5f5; border-radius: 10px;">
   ${tasks
     ?.filter((task) => {
       return moment(task.dueDate).format("YYYY-MM-DD").before(today);
     })
     .map((task) => {
       return `<p>${task.summary} is due on ${moment(task.dueDate).format(
         "DD MMMM YYYY"
       )}</p>`;
     })}
  </div>
  <div>
  <h1>Tasks Pending</h1>
  <div style="margin-top: 10px; padding: 10px; background-color: #f5f5f5; border-radius: 10px;">
  ${tasks
    ?.filter((task) => task.status === "To Do")
    .map((task) => {
      return `<p>${task.summary} is due on ${moment(task.dueDate).format(
        "DD MMMM YYYY"
      )}</p>`;
    })}

  </div>
  


    <div>
      <button
        style="
          margin-top: 20px;
          padding: 10px 20px 10px 20px;
          width: fit-content;
          background-color: #141414;
          color: white;
          border-radius: 5px;
          border: none;
          cursor: pointer;
        "
      >
        <a
          href="https://localhost:3000/dashboard"
          style="text-decoration: none; color: white"
          >View Tasks</a
        >
      </button>
    </div>

    <div style="display: flex; position: absolute; bottom: 5px">
      <table>
        <td align="center" class="esd-block-text es-p35b">
          <p>
            Hivvaru Team&nbsp;© 2022 Alivelun Pvt Ltd, Inc. All Rights Reserved.
          </p>
          <p>Male', Male' City. +960 9993529, +960 7600662</p>
        </td>
      </table>
    </div>
  </body>
</html>
`,
  });
}
