const TodoModel = require('../models/Todo');

const todoController = {
    getAllTodos: async (req, res) => {
        const { showCompleted } = req.query;
        try {
            let query = {};
            if (showCompleted === 'true') {
                query.isComplete = true;
            } else if (showCompleted === 'false') {
                query.isComplete = false;
            }
            const todos = await TodoModel.find(query);
            res.json(todos);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching todos', error: err });
        }
    },

    getTodoCounts: async (req, res) => {
        try {
            const completedCount = await TodoModel.countDocuments({ isComplete: true });
            const onGoingCount = await TodoModel.countDocuments({ isComplete: false });
            res.json({ completedCount, onGoingCount });
        } catch (err) {
            res.status(500).json({ message: 'Error fetching counts', error: err });
        }
    },

    createTodo: async (req, res) => {
        const { content, deadline } = req.body;
        try {
            const newTodo = await TodoModel.create({ content, deadline });
            console.log('Task added to DB:', newTodo);
            res.json(newTodo);
        } catch (err) {
            console.log('Error adding task to DB:', err);
            res.status(500).json({ message: 'Error creating todo', error: err });
        }
    },

    updateTodo: async (req, res) => {
        const { id } = req.params;
        console.log('Updating todo with id:', id);
        try {
            const todo = await TodoModel.findById(id);
            if (!todo) {
                return res.status(404).json({ message: 'Task not found' });
            }
            todo.isComplete = !todo.isComplete;
            const updatedTodo = await todo.save();
            res.json(updatedTodo);
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ message: 'Error updating task', error: err });
        }
    },

    deleteTodo: async (req, res) => {
        const { id } = req.params;
        console.log('Deleting todo with id:', id);
        try {
            const deletedTodo = await TodoModel.findByIdAndDelete(id);
            if (!deletedTodo) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.json({ message: 'Task deleted successfully' });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ message: 'Error deleting task', error: err });
        }
    }
};

module.exports = todoController;