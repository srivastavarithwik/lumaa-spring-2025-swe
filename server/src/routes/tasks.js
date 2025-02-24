const express = require('express');
const pool = require('../db');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// GET /tasks – Retrieve tasks for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await pool.query('SELECT * FROM tasks WHERE "userId" = $1', [userId]);
        res.json(tasks.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /tasks/:id – Retrieve a specific task by ID for the authenticated user
router.get('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const task = await pool.query('SELECT * FROM tasks WHERE id = $1 AND "userId" = $2', [id, userId]);
        console.log(task);
        if (task.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task.rows[0]); // Return the task details
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /tasks – Create a new task
router.post('/', authenticateToken, async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;
    try {
        const newTask = await pool.query(
            'INSERT INTO tasks (title, description, "userId") VALUES ($1, $2, $3) RETURNING *',
            [title, description, userId]
        );
        res.status(201).json(newTask.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /tasks/:id – Update an existing task
router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;
    const userId = req.user.id;
    try {
        const updatedTask = await pool.query(
            'UPDATE tasks SET title = $1, description = $2, "isComplete" = $3 WHERE id = $4 AND "userId" = $5 RETURNING *',
            [title, description, isComplete, id, userId]
        );
        if (updatedTask.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(updatedTask.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /tasks/:id – Delete a task
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const result = await pool.query(
            'DELETE FROM tasks WHERE id = $1 AND "userId" = $2 RETURNING *',
            [id, userId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;