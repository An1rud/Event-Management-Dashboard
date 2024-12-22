import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Fab } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.clear();
    sessionStorage.clear();
    
    // Show success message
    toast.success('Successfully logged out');
    
    // Force navigation to login page
    setTimeout(() => {
      navigate('/login', { replace: true });
      // Reload the page to clear any cached states
      window.location.reload();
    }, 500);
  };

  return (
    <StyledWrapper>
      <Fab
        color="secondary"
        onClick={handleLogout}
        className="logout-button"
        sx={{
          position: 'fixed',
          left: 20,
          bottom: 20,
          background: 'linear-gradient(45deg, #ff3d00 30%, #ff1744 90%)',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(45deg, #ff1744 30%, #d50000 90%)',
            transform: 'rotate(360deg) scale(1.1)',
          },
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <LogoutIcon />
      </Fab>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .logout-button {
    animation: slideIn 0.5s ease-out;
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export default LogoutButton;
