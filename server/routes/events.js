const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth');

// Get all events
router.get('/', auth, async (req, res) => {
    try {
        const events = await Event.find().populate('attendees');
        res.json(events);
    } catch (err) {
        console.error('Error fetching events:', err);
        res.status(500).json({ message: err.message });
    }
});

// Create event
router.post('/', auth, async (req, res) => {
    try {
        console.log('Received request body:', req.body);
        const { name, description, location, date } = req.body;
        
        // Validate required fields
        if (!name || !description || !location || !date) {
            console.log('Missing fields:', {
                name: !name,
                description: !description,
                location: !location,
                date: !date
            });
            return res.status(400).json({ 
                message: 'Missing required fields',
                required: ['name', 'description', 'location', 'date'],
                received: { name, description, location, date }
            });
        }

        const event = new Event({
            name,
            description,
            location,
            date: new Date(date),
            attendees: req.body.attendees || []
        });

        console.log('Creating event:', event);
        const newEvent = await event.save();
        console.log('Event created:', newEvent);
        res.status(201).json(newEvent);
    } catch (err) {
        console.error('Error creating event:', err);
        res.status(400).json({ 
            message: 'Error creating event', 
            error: err.message 
        });
    }
});

// Update event
router.put('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        Object.assign(event, req.body);
        const updatedEvent = await event.save();
        res.json(updatedEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete event
router.delete('/:id', auth, async (req, res) => {
    try {
        console.log('Attempting to delete event:', req.params.id);
        const result = await Event.findByIdAndDelete(req.params.id);
        
        if (!result) {
            console.log('Event not found for deletion:', req.params.id);
            return res.status(404).json({ message: 'Event not found' });
        }

        console.log('Event deleted successfully:', result);
        res.json({ message: 'Event deleted successfully', deletedEvent: result });
    } catch (err) {
        console.error('Error deleting event:', err);
        res.status(500).json({ 
            message: 'Error deleting event',
            error: err.message 
        });
    }
});

module.exports = router;
