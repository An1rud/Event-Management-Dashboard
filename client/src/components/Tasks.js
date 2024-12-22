import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  LinearProgress,
  Fab,
  Box,
  CardActions,
  IconButton
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import axios from 'axios';
import Checkbox from './Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    deadline: '',
    event: '',
    assignedTo: ''
  });

  // Configure axios with auth header
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchEvents();
    fetchAttendees();
  }, []);

  const fetchTasks = async () => {
    try {
      console.log('Fetching tasks...');
      const response = await axios.get('http://localhost:5000/api/tasks', axiosConfig);
      console.log('Tasks response:', response);
      setTasks(response.data || []);
    } catch (error) {
      console.error('Error fetching tasks:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText
      });
      toast.error(`Error fetching tasks: ${error.response?.data?.message || error.message}`);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events', axiosConfig);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Error fetching events');
    }
  };

  const fetchAttendees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/attendees', axiosConfig);
      setAttendees(response.data);
    } catch (error) {
      console.error('Error fetching attendees:', error);
      toast.error('Error fetching attendees');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', {
        name: formData.name,
        description: formData.description,
        deadline: formData.deadline,
        event: formData.event,
        assignedTo: formData.assignedTo
      }, axiosConfig);
      toast.success('Task created successfully');
      setOpen(false);
      fetchTasks();
      setFormData({ name: '', description: '', deadline: '', event: '', assignedTo: '' });
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error(error.response?.data?.message || 'Error creating task');
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${taskId}/status`, {
        status: newStatus,
      }, axiosConfig);
      toast.success('Task status updated');
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('Error updating task status');
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, axiosConfig);
      toast.success('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task');
    }
  };

  const calculateProgress = (tasks) => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((task) => task.status === 'Completed').length;
    return (completed / tasks.length) * 100;
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#ffffff', mb: 3 }}>
        Tasks
      </Typography>

      <LinearProgress 
        variant="determinate" 
        value={calculateProgress(tasks)} 
        sx={{ mb: 4 }}
      />

      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task._id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                backgroundColor: '#000000',
                color: '#ffffff',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  transition: 'transform 0.3s ease-in-out',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
                }
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" sx={{ color: '#ffffff', mb: 1 }}>
                  {task.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#cccccc', mb: 2 }}>
                  Event: {task.event?.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#cccccc', mb: 2 }}>
                  Assigned to: {task.assignedTo?.name || 'Unassigned'}
                </Typography>
                <Typography variant="body2" sx={{ color: '#999999', mb: 2 }}>
                  Due: {new Date(task.deadline).toLocaleDateString()}
                </Typography>
                {task.description && (
                  <Typography variant="body2" sx={{ color: '#cccccc', mb: 2 }}>
                    Description: {task.description}
                  </Typography>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <Checkbox 
                    checked={task.status === 'Completed'} 
                    onChange={() => handleStatusChange(
                      task._id,
                      task.status === 'Pending' ? 'Completed' : 'Pending'
                    )}
                  />
                  <Typography 
                    sx={{ 
                      ml: 2, 
                      color: task.status === 'Completed' ? '#4caf50' : '#ff9800',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {task.status}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ mt: 'auto', p: 2, borderTop: '1px solid #333333' }}>
                <IconButton 
                  onClick={() => handleDelete(task._id)} 
                  size="small" 
                  sx={{ color: '#ffffff' }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Fab 
        aria-label="add" 
        onClick={() => setOpen(true)}
        sx={{ 
          position: 'fixed', 
          bottom: 16, 
          right: 16,
          backgroundColor: '#000000',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#333333'
          }
        }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Task Name"
            fullWidth
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Deadline"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Event</InputLabel>
            <Select
              value={formData.event}
              onChange={(e) => setFormData({ ...formData, event: e.target.value })}
            >
              {events.map((event) => (
                <MenuItem key={event._id} value={event._id}>
                  {event.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Assign To</InputLabel>
            <Select
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            >
              {attendees.map((attendee) => (
                <MenuItem key={attendee._id} value={attendee._id}>
                  {attendee.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Tasks;
