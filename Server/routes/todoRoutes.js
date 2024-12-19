const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/todos', authMiddleware, todoController.getAllTodos);
router.get('/todos/counts', authMiddleware, todoController.getTodoCounts);
router.post('/todos', authMiddleware, todoController.createTodo);
router.put('/todos/:id', authMiddleware, todoController.updateTodo);
router.delete('/todos/:id', authMiddleware, todoController.deleteTodo);

module.exports = router; 