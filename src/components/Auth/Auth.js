import React, { useState } from 'react';
import axios from 'axios';
import './Auth.scss';

function Auth({ onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'student',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp ? '/api/signup' : '/api/login';
    try {
      const data = isSignUp ? formData : {
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post(`http://127.0.0.1:5000${endpoint}`, data, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (response.data.success) {
        if (isSignUp) {
          alert('Sign-up successful! Please log in.');
          setIsSignUp(false);
          setFormData({
            name: '',
            email: '',
            password: '',
            role: 'student',
          });
        } else {
            onAuthSuccess({
                name: response.data.user.name,
                email: response.data.user.email,
                role: response.data.role,
              });        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
      alert(errorMessage);
    }
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__toggle">
          <button onClick={handleToggle}>
            {isSignUp ? 'Already have an account?' : 'Create an account'}
          </button>
        </div>
        <div className="auth__form-container">
          <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
          <form className="auth__form" onSubmit={handleSubmit}>
            {isSignUp ? (
              <>
                {/* Sign Up Form */}
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div className="auth__role">
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={formData.role === 'student'}
                      onChange={handleChange}
                    />
                    Student
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="professor"
                      checked={formData.role === 'professor'}
                      onChange={handleChange}
                    />
                    Professor
                  </label>
                </div>
                <button type="submit">Sign Up</button>
              </>
            ) : (
              <>
                {/* Sign In Form */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button type="submit">Log In</button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;