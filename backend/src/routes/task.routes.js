import express from 'express'
import { postTasks, getTasks, getTask, updateTask, deleteTask, toggleTaskStatus } from '../controller/task.controller.js';

const router = express.Router()

router.get('/tasks', getTasks);
router.post('/tasks', postTasks);

router.get('/tasks/:id', getTask)
router.patch('/tasks/:id', updateTask)
router.delete('/tasks/:id', deleteTask)

router.patch('/tasks/:id/toggle', toggleTaskStatus)

export default router;