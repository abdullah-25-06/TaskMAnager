const express = require("express");
const path = require("path");
const hbs = require("hbs");
const tasks = require("../routes/task");
const errorhandler = require("../middleware/error-handler")
const PublicPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
const connectDB = require("../db/connection");
require('dotenv').config()
const app = express();
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);
app.use(express.static(PublicPath));

// app.get('get', (req,res)=>{
//     res.render('index')
// })

app.use(express.json());
// Same Way Nechay do tarikay
app.use("/api/v1/tasks", tasks);
// app.use('/',tasks)

app.use(errorhandler)
const start = async () => {
    try {
    await connectDB(process.env.Mongo_uri);
    app.listen(3000, () => {
      console.log("Server is started at http://127.0.0.1:3000");
    });
  } catch (e) {
    console.log(e);
  }
};
start()
//app.get('/api/v1/tasks')          - get all the tasks
//app.post('/api/v1/tasks')         - create a new tasks
//app.get('/api/v1/tasks/:id')      - get single task
//app.patch('/api/v1/tasks/:id')    - update task
//app.delete('/api/v1/tasks/:id')   - delete task
