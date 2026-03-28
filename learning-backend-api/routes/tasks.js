const express = require('express');
const { body, param, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs/promises');

const router = express.Router();
const TASKS_FILE = path.join(__dirname, '../data/tasks.json');

// Load tasks from JSON file (learning: async file I/O)
const loadTasks = async () => {
  try {
    const data = await fs.readFile(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return []; // Empty on first run
  }
};

// Save tasks to JSON file
const saveTasks = async (tasks) => {
  await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

// GET /api/tasks - List all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await loadTasks();
    console.log(`📋 Retrieved ${tasks.length} tasks`);
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

// GET /api/tasks/:id - Get single task
router.get('/:id', [
  param('id').isUUID().withMessage('Valid UUID required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const tasks = await loadTasks();
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    console.log(`📋 Retrieved task ${req.params.id}`);
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    console.error('Error retrieving task:', error);
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
});

// POST /api/tasks - Create new task
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional().isLength({ min: 0 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const tasks = await loadTasks();
    const newTask = {
      id: uuidv4(),
      title: req.body.title,
      description: req.body.description || '',
      completed: false,
      createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    await saveTasks(tasks);
    console.log(`➕ Created task ${newTask.id}`);
    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT /api/tasks/:id - Update task
router.put('/:id', [
  param('id').isUUID().withMessage('Valid UUID required'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional(),
  body('completed').optional().isBoolean().withMessage('Completed must be boolean')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const tasks = await loadTasks();
    const index = tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    tasks[index] = { ...tasks[index], ...req.body, updatedAt: new Date().toISOString() };
    await saveTasks(tasks);
    console.log(`✏️ Updated task ${req.params.id}`);
    res.status(200).json({ success: true, data: tasks[index] });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', [
  param('id').isUUID().withMessage('Valid UUID required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const tasks = await loadTasks();
    const index = tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(index, 1);
    await saveTasks(tasks);
    console.log(`🗑️ Deleted task ${req.params.id}`);
    res.status(200).json({ success: true, message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;

