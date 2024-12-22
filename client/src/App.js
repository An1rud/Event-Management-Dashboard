import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Events from './components/Events';
import Attendees from './components/Attendees';
import Tasks from './components/Tasks';
import LandingPage from './components/LandingPage';
import LogoutButton from './components/LogoutButton';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const StyledApp = styled.div`
  min-height: 100vh;
  background: linear-gradient(
      30deg,
      #111111 12%,
      transparent 12.5%,
      transparent 87%,
      #111111 87.5%,
      #111111
    ),
    linear-gradient(
      150deg,
      #111111 12%,
      transparent 12.5%,
      transparent 87%,
      #111111 87.5%,
      #111111
    ),
    linear-gradient(
      30deg,
      #111111 12%,
      transparent 12.5%,
      transparent 87%,
      #111111 87.5%,
      #111111
    ),
    linear-gradient(
      150deg,
      #111111 12%,
      transparent 12.5%,
      transparent 87%,
      #111111 87.5%,
      #111111
    ),
    linear-gradient(
      60deg,
      #77777777 25%,
      transparent 25.5%,
      transparent 75%,
      #77777777 75%,
      #77777777
    ),
    linear-gradient(
      60deg,
      #77777777 25%,
      transparent 25.5%,
      transparent 75%,
      #77777777 75%,
      #77777777
    );
  background-position:
    0 0,
    0 0,
    40px 70px,
    40px 70px,
    0 0,
    40px 70px;
  background-color: #000000;
  background-size: 80px 140px;
  box-shadow: inset 0 0 100px rgba(255, 215, 0, 0.1);
  position: relative;
`;

function App() {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <Router>
          {isAuthenticated && <Navbar />}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/events" />} />
            <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/events" />} />
            <Route
              path="/events"
              element={
                <PrivateRoute>
                  <Events />
                </PrivateRoute>
              }
            />
            <Route
              path="/attendees"
              element={
                <PrivateRoute>
                  <Attendees />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <Tasks />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          {isAuthenticated && <LogoutButton />}
          <ToastContainer position="bottom-right" theme="dark" />
        </Router>
      </StyledApp>
    </ThemeProvider>
  );
}

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default App;
