import React from 'react';
import styled from 'styled-components';

const Pattern = () => {
  return (
    <StyledWrapper>
      <div className="container" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;

  .container {
    width: 100%;
    height: 100%;
    background: 
      repeating-radial-gradient(
        circle at 0 0,
        #f8f9fa,
        #f8f9fa 5px,
        #e9ecef 6px,
        #e9ecef 8px
      ),
      linear-gradient(45deg, #f1f3f5, #dee2e6);
    background-size: 30px 30px, 100% 100%;
    opacity: 0.8;
    animation: pulse 10s ease-in-out infinite;
  }

  @keyframes pulse {
    0% {
      opacity: 0.7;
    }
    50% {
      opacity: 0.9;
    }
    100% {
      opacity: 0.7;
    }
  }
`;

export default Pattern;
