const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')


const app = express()
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://localhost:27017/todos')

app.get('/api/todos', async (req, res) => {
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
  });


  app.get('/api/todos/counts', async (req, res) => {
    try {
      const completedCount = await TodoModel.countDocuments({ isComplete: true });
      const onGoingCount = await TodoModel.countDocuments({ isComplete: false });
  
      res.json({
        completedCount,
        onGoingCount
      });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching counts', error: err });
    }
  });


  app.put('/api/todos/:id', async (req, res) => {
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
  });

app.delete('/api/todos/:id', async (req, res) => {
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
});


app.post('/api/todos',(req, res) =>{
    const {content} = req.body;
    TodoModel.create({
        content: content,
    })
    .then(result => {
        console.log('Task added to DB:', result);
        res.json(result)})
    .catch(err => {
        console.log('Error adding task to DB:', err); 
        res.json(err)})
})


app.listen(5000, ()=>{
    console.log("Server is Running")
})
