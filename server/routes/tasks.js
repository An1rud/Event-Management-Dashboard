const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

console.log('Tasks router loaded');

// Get all tasks
router.get('/', auth, async (req, res) => {
    console.log('GET /api/tasks - Fetching all tasks');
    try {
        const tasks = await Task.find()
            .populate('assignedTo')
            .populate('event');
        console.log('Found tasks:', tasks);
        console.log(`Found ${tasks.length} tasks`);
        res.json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', {
            message: err.message,
            stack: err.stack
        });
        res.status(500).json({ 
            message: 'Error fetching tasks', 
            error: err.message
        });
    }
});

// Get tasks for an event
router.get('/event/:eventId', async (req, res) => {
    try {
        const tasks = await Task.find({ event: req.params.eventId })
            .populate('assignedTo')
            .populate('event');
        res.json(tasks);
    } catch (err) {
        console.error('Error fetching event tasks:', err);
        res.status(500).json({ message: 'Error fetching event tasks', error: err.message });
    }
});

// Create task
router.post('/', auth, async (req, res) => {
    try {
        const { name, description, deadline, event, assignedTo } = req.body;
        console.log('Creating task with data:', { name, description, deadline, event, assignedTo });

        // Validate required fields
        if (!name || !deadline || !event || !assignedTo) {
            return res.status(400).json({
                message: 'Missing required fields',
                required: ['name', 'deadline', 'event', 'assignedTo']
            });
        }

        const task = new Task({
            name,
            description,
            deadline: new Date(deadline),
            event,
            assignedTo,
            status: 'Pending'
        });

        await task.save();
        console.log('Task saved:', task);
        
        const populatedTask = await Task.findById(task._id)
            .populate('assignedTo')
            .populate('event');
        console.log('Populated task:', populatedTask);

        res.status(201).json(populatedTask);
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ message: 'Error creating task', error: err.message });
    }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
    try {
        console.log('Attempting to delete task:', req.params.id);
        const result = await Task.findByIdAndDelete(req.params.id);
        
        if (!result) {
            console.log('Task not found for deletion:', req.params.id);
            return res.status(404).json({ message: 'Task not found' });
        }

        console.log('Task deleted successfully:', result);
        res.json({ message: 'Task deleted successfully', deletedTask: result });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ 
            message: 'Error deleting task',
            error: err.message 
        });
    }
});

// Update task status
router.patch('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;
        if (!status || !['Pending', 'Completed'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )
        .populate('assignedTo')
        .populate('event');

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (err) {
        console.error('Error updating task status:', err);
        res.status(400).json({ message: 'Error updating task status', error: err.message });
    }
});

module.exports = router;
