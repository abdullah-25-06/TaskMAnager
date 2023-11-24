const Task = require("../models/task");
const AsyncWrapper = require("../middleware/async");
const { CreateCustomError }= require("../errors/custom-error");
// const getAllTasks = async (req, res) => {
//   try {
//     const all = await Task.find({});
//     res.status(500).json({ tasks: all });
//   } catch (err) {
//     res.status(500).json({ err });
//   }
// };
const getAllTasks = AsyncWrapper(async (req, res) => {
  const all = await Task.find({});
  res.status(500).json({ tasks: all });
});
// const createTask = async (req, res) => {
//   const task =await Task.create(req.body);
//   res.status(201).json({ task });
// };

const createTask = AsyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});
const getTask = AsyncWrapper(async (req, res,next) => {
  // const{id:Taskid} = req.params
  const task = await Task.findOne({ _id: req.params.id });
  // const task = await Task.findOne({ _id:Taskid });
  if (!task) {
    // return res.status(404).json({ err: "No Task with such id" });
    return next(CreateCustomError('No such task Boy',404))
  }
  return res.status(200).json({ task });
});

const updateTask = AsyncWrapper(async (req, res) => {
  const { name, completed } = req.body;
  const task = await Task.findByIdAndUpdate(
    { _id: req.params.id },
    { name: name },
    { new: true, runValidators: true }
  );
  if (!task) {
    return res.status(404).json({ err: "No Task with such id" });
  }
  res.status(200).json({ task });
});

const deleteTask = AsyncWrapper(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id });
  if (!task) {
    return res.status(404).json({ err: "No Task with such id" });
  }
  res.status(200).json({ task });

});
module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
