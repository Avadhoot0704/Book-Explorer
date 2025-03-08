import React, { useState} from 'react';
import {useNavigate } from 'react-router-dom'

import axios from "axios";
const URL = "http://localhost:5000"


const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post("http://localhost:5000/login",formData,{withCredentials:true})
      
      setFormData({
        username: '',
        password: '',
      });
      

      if(res.data.success){
         navigate("/booklist")
      }
    
    } catch (error) {
      if(error.response.status == 401){
        alert(error.response.data.message)
      }
      setFormData({
        username: '',
        password: '',
      });
      
    }
  };

  const handleSignup = () => {
   
    
    navigate("/register")
    
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-title">Login</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>
        </form>
        
        <div className="signup-container">
          <p className="signup-text">
            Don't have an account?
          </p>
          <button
            onClick={handleSignup}
            className="signup-button"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;