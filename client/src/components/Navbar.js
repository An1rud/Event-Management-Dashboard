import React from 'react';
import { AppBar, Toolbar, Typography, Button, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#000000',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
});

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Event Manager
        </Typography>
        {isLoggedIn ? (
          <>
            <Button color="inherit" onClick={() => navigate('/events')}>Events</Button>
            <Button color="inherit" onClick={() => navigate('/attendees')}>Attendees</Button>
            <Button color="inherit" onClick={() => navigate('/tasks')}>Tasks</Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
            <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
          </>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
