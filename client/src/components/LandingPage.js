import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Pattern from './Pattern';
import StyledButton from './StyledButton';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <StyledWrapper>
      <Pattern />
      <div className="content">
        <h1>Welcome to Event Manager</h1>
        <div className="buttons">
          <StyledButton text="Login" onClick={() => navigate('/login')} />
          <StyledButton text="Sign Up" onClick={() => navigate('/register')} />
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 1;
  }

  h1 {
    color: #ffffff;
    font-size: 3rem;
    margin-bottom: 2rem;
    text-shadow: 0 0 10px rgba(0,140,255,0.5);
  }

  .buttons {
    display: flex;
    gap: 2rem;
    justify-content: center;
  }
`;

export default LandingPage;
