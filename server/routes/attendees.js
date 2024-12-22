const express = require('express');
const router = express.Router();
const Attendee = require('../models/Attendee');
const auth = require('../middleware/auth');

// Debug middleware
router.use((req, res, next) => {
    console.log(`[Attendees Route] ${req.method} ${req.path}`);
    console.log('Headers:', req.headers);
    next();
});

// Get all attendees
router.get('/', auth, async (req, res) => {
    try {
        console.log('GET /attendees - Fetching all attendees');
        const attendees = await Attendee.find().populate('events tasks');
        console.log(`Found ${attendees.length} attendees`);
        res.json(attendees);
    } catch (err) {
        console.error('Error fetching attendees:', err);
        res.status(500).json({ message: err.message });
    }
});

// Create attendee
router.post('/', auth, async (req, res) => {
    try {
        console.log('POST /attendees - Creating new attendee');
        console.log('Request body:', req.body);
        
        const { name, email, phone, role } = req.body;
        
        // Validate required fields
        if (!name || !email) {
            console.log('Missing required fields');
            return res.status(400).json({
                message: 'Missing required fields',
                required: ['name', 'email']
            });
        }

        const attendee = new Attendee({
            name,
            email,
            phone: phone || '',
            role: role || 'Attendee'
        });

        const newAttendee = await attendee.save();
        console.log('Attendee created successfully:', newAttendee);
        res.status(201).json(newAttendee);
    } catch (err) {
        console.error('Error creating attendee:', err);
        res.status(400).json({ message: 'Error creating attendee', error: err.message });
    }
});

// Update attendee by ID
router.put('/:id', auth, async (req, res) => {
    try {
        console.log(`PUT /attendees/${req.params.id} - Updating attendee`);
        console.log('Request params:', req.params);
        console.log('Request body:', req.body);
        console.log('Auth token:', req.headers.authorization);

        const attendee = await Attendee.findById(req.params.id);
        if (!attendee) {
            console.log('Attendee not found:', req.params.id);
            return res.status(404).json({ message: 'Attendee not found' });
        }

        const { name, email, phone, role } = req.body;
        
        // Update fields
        attendee.name = name;
        attendee.email = email;
        attendee.phone = phone || '';
        attendee.role = role || 'Attendee';

        const updatedAttendee = await attendee.save();
        console.log('Attendee updated successfully:', updatedAttendee);
        res.json(updatedAttendee);
    } catch (err) {
        console.error('Error updating attendee:', err);
        res.status(400).json({ 
            message: 'Error updating attendee', 
            error: err.message,
            details: err.errors || err
        });
    }
});

// Delete attendee by ID
router.delete('/:id', auth, async (req, res) => {
    try {
        console.log(`DELETE /attendees/${req.params.id} - Deleting attendee`);
        const result = await Attendee.findByIdAndDelete(req.params.id);
        
        if (!result) {
            console.log('Attendee not found:', req.params.id);
            return res.status(404).json({ message: 'Attendee not found' });
        }

        console.log('Attendee deleted successfully:', result);
        res.json({ message: 'Attendee deleted successfully', deletedAttendee: result });
    } catch (err) {
        console.error('Error deleting attendee:', err);
        res.status(500).json({ 
            message: 'Error deleting attendee',
            error: err.message 
        });
    }
});

// Assign attendee to event
router.post('/:id/events/:eventId', auth, async (req, res) => {
    try {
        const attendee = await Attendee.findById(req.params.id);
        if (!attendee) return res.status(404).json({ message: 'Attendee not found' });

        attendee.events.push(req.params.eventId);
        const updatedAttendee = await attendee.save();
        res.json(updatedAttendee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
