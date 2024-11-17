import React, { useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
 const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev)=>({
      ...prev,
      [name] : value
    }));
    
  };

const handleSubmit =  (e) => {
  e.preventDefault();

  axios.post("https://financetracker-zgc4.onrender.com/project/save", formData)
  .then((response) => {
    alert("Data saved");
  })
  .catch((error) => {
    alert("Failed to save data");
  });

};


  return (
    <div className="login_container">
      <div className="login">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="login_fields">
            <input
              type="text"
              name="username"n
              placeholder="Your Name"
              // value={formData.username}
              onChange={handleChange}
              // autocomplete="name"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              autocomplete="email"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autocomplete="new-password"
            />
          </div>
          <button className='login-btn' type="submit">Continue</button>
        </form>

        <p className="login_acc">
          Already have an Account?{' '}
          <Link style={{ textDecoration: 'none', color: '#b31313' }} to="/login">
            login here
          </Link>
        </p>
      
      </div>
    </div>
  );
}

export default Register;


