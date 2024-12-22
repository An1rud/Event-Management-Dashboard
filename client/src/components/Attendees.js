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
import AttendeeCard from './AttendeeCard';

const Attendees = () => {
  const [attendees, setAttendees] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    email: '',
    phone: '',
    role: '',
  });

  // Configure axios with auth header
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  };

  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/attendees', axiosConfig);
      setAttendees(response.data);
    } catch (error) {
      console.error('Error fetching attendees:', error.response?.data || error);
      toast.error('Error fetching attendees');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form:', { isEditing, formData });
    
    try {
      if (isEditing) {
        console.log('Updating attendee with ID:', formData._id);
        const url = `http://localhost:5000/api/attendees/${formData._id}`;
        console.log('Making PUT request to:', url);
        console.log('Auth token:', localStorage.getItem('token'));
        
        const updateData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          role: formData.role || 'Attendee'
        };
        console.log('Update payload:', updateData);
        
        const response = await axios.put(url, updateData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Update response:', response.data);
        toast.success('Attendee updated successfully');
      } else {
        console.log('Creating new attendee');
        const createData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          role: formData.role || 'Attendee'
        };
        console.log('Create payload:', createData);
        
        await axios.post('http://localhost:5000/api/attendees', createData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        toast.success('Attendee added successfully');
      }
      setOpen(false);
      await fetchAttendees();
      resetForm();
    } catch (error) {
      console.error('Error saving attendee:', error);
      if (error.response) {
        console.error('Error response:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          url: error.response.config.url,
          method: error.response.config.method,
          headers: error.response.config.headers
        });
      }
      toast.error(`Error ${isEditing ? 'updating' : 'adding'} attendee: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDelete = async (attendeeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/attendees/${attendeeId}`, axiosConfig);
      toast.success('Attendee removed successfully');
      fetchAttendees();
    } catch (error) {
      console.error('Error deleting attendee:', error.response?.data || error);
      toast.error('Error removing attendee');
    }
  };

  const handleEdit = (attendee) => {
    console.log('Editing attendee:', attendee);
    setFormData({
      _id: attendee._id,
      name: attendee.name,
      email: attendee.email,
      phone: attendee.phone || '',
      role: attendee.role || 'Attendee'
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
    console.log('Resetting form');
    setFormData({
      _id: '',
      name: '',
      email: '',
      phone: '',
      role: ''
    });
    setIsEditing(false);
  };

  const handleClose = () => {
    console.log('Closing dialog');
    setOpen(false);
    resetForm();
  };

  return (
    <StyledWrapper>
      <Container>
        <div className="attendees-header">
          <h1>Attendees</h1>
        </div>

        <div className="attendees-grid">
          {attendees.map((attendee) => (
            <AttendeeCard 
              key={attendee._id} 
              attendee={attendee} 
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

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{isEditing ? 'Edit Attendee' : 'Add New Attendee'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="phone"
              label="Phone"
              type="tel"
              fullWidth
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="role"
              label="Role"
              type="text"
              fullWidth
              value={formData.role}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {isEditing ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding: 2rem 0;
  position: relative;
  min-height: 100vh;

  .attendees-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .attendees-grid {
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

export default Attendees;
