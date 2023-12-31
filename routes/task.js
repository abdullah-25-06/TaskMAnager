const { Router } =require('express')
const { getAllTasks,createTask,deleteTask,updateTask,getTask } = require('../controller/task');

const router= Router()

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)



module.exports = router