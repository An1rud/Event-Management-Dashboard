import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import Loader from './Loader';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      
      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toast.success('Login successful!');
      
      // Keep loading for a short duration for visual feedback
      setTimeout(() => {
        setLoading(false);
        // Force a page reload to update the navbar state
        window.location.href = '/events';
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      {loading && <Loader />}
      <StyledWrapper>
        <div className="login-box">
          <p>Login</p>
          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <input
                required
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
              />
              <label>Email</label>
            </div>
            <div className="user-box">
              <input
                required
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              <label>Password</label>
            </div>
            <button type="submit" className="submit-btn">
              <span />
              <span />
              <span />
              <span />
              Submit
            </button>
          </form>
          <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/register'); }} className="a2">Sign up!</a></p>
        </div>
      </StyledWrapper>
    </>
  );
}

const StyledWrapper = styled.div`
  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    padding: 40px;
    margin: 20px auto;
    transform: translate(-50%, -55%);
    background: rgba(0,0,0,.9);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0,0,0,.6);
    border-radius: 10px;
  }

  .login-box p:first-child {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .login-box .user-box {
    position: relative;
  }

  .login-box .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
  }

  .login-box .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: .5s;
  }

  .login-box .user-box input:focus ~ label,
  .login-box .user-box input:valid ~ label {
    top: -20px;
    left: 0;
    color: #fff;
    font-size: 12px;
  }

  .login-box form .submit-btn {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    font-weight: bold;
    color: #fff;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 40px;
    letter-spacing: 3px;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .login-box .submit-btn:hover {
    background: #fff;
    color: #272727;
    border-radius: 5px;
  }

  .login-box .submit-btn span {
    position: absolute;
    display: block;
  }

  .login-box .submit-btn span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #fff);
    animation: btn-anim1 1.5s linear infinite;
  }

  @keyframes btn-anim1 {
    0% {
      left: -100%;
    }

    50%,100% {
      left: 100%;
    }
  }

  .login-box .submit-btn span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #fff);
    animation: btn-anim2 1.5s linear infinite;
    animation-delay: .375s
  }

  @keyframes btn-anim2 {
    0% {
      top: -100%;
    }

    50%,100% {
      top: 100%;
    }
  }

  .login-box .submit-btn span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #fff);
    animation: btn-anim3 1.5s linear infinite;
    animation-delay: .75s
  }

  @keyframes btn-anim3 {
    0% {
      right: -100%;
    }

    50%,100% {
      right: 100%;
    }
  }

  .login-box .submit-btn span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #fff);
    animation: btn-anim4 1.5s linear infinite;
    animation-delay: 1.125s
  }

  @keyframes btn-anim4 {
    0% {
      bottom: -100%;
    }

    50%,100% {
      bottom: 100%;
    }
  }

  .login-box p:last-child {
    color: #aaa;
    font-size: 14px;
  }

  .login-box a.a2 {
    color: #fff;
    text-decoration: none;
  }

  .login-box a.a2:hover {
    background: transparent;
    color: #aaa;
    border-radius: 5px;
  }
`;

export default Login;
