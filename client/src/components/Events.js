import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Fab,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import axios from 'axios';
import EventCard from './EventCard';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
  });

  // Configure axios with auth header
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events', axiosConfig);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error.response?.data || error);
      toast.error('Error fetching events');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check word count in description
    const wordCount = formData.description.trim().split(/\s+/).length;
    if (wordCount > 50) {
      toast.error('Description must be limited to 50 words');
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/events/${formData._id}`, formData, axiosConfig);
        toast.success('Event updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/events', formData, axiosConfig);
        toast.success('Event created successfully');
      }
      setOpen(false);
      fetchEvents();
      resetForm();
    } catch (error) {
      console.error('Error saving event:', error.response?.data || error);
      toast.error(`Error ${isEditing ? 'updating' : 'creating'} event`);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`, axiosConfig);
      toast.success('Event deleted successfully');
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error.response?.data || error);
      toast.error('Error deleting event');
    }
  };

  const handleEdit = (event) => {
    setFormData({
      _id: event._id,
      name: event.name,
      description: event.description,
      location: event.location,
      date: event.date.split('T')[0], // Format date for input field
    });
    setIsEditing(true);
    setOpen(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      location: '',
      date: '',
    });
    setIsEditing(false);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  return (
    <StyledWrapper>
      <Container>
        <div className="events-header">
          <h1>Events</h1>
        </div>
        <div className="events-grid">
          {events.map(event => (
            <EventCard
              key={event._id}
              event={event}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
        <Fab 
          className="add-button"
          onClick={() => {
            resetForm();
            setIsEditing(false);
            setOpen(true);
          }}
        >
          <AddIcon />
        </Fab>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Edit Event' : 'Create New Event'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Event Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description (max 50 words)"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
            helperText={`${formData.description.trim().split(/\s+/).length}/50 words`}
            error={formData.description.trim().split(/\s+/).length > 50}
          />
          <TextField
            margin="dense"
            name="location"
            label="Location"
            type="text"
            fullWidth
            value={formData.location}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="date"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.date}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding: 2rem 0;
  position: relative;
  min-height: 100vh;

  .events-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    justify-items: center;
  }

  h1 {
    margin: 0;
    color: #ffffff;
  }

  .add-button {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background-color: #000 !important;
    color: #fff !important;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2) !important;
    transition: all 0.2s ease !important;

    &:hover {
      background-color: #000 !important;
      transform: translate(-2px, -2px);
      box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.2) !important;
    }

    &:active {
      transform: translate(2px, 2px);
      box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2) !important;
    }

    svg {
      fill: #fff;
      width: 24px;
      height: 24px;
    }
  }
`;

export default Events;
