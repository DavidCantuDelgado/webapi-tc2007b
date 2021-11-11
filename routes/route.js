const express = require('express');
const taskController = require('../controllers/taskController')
const router = express.Router();

router.get('/api/getTasks', taskController.getTasks);
router.get('/api/getTask/:id', taskController.getTask);
router.post('/api/addTask', taskController.addTask);
router.put('/api/updateTask/:id', taskController.updateTask);
router.delete('/api/deleteTask/:id' , taskController.deleteTask);

module.exports = router;