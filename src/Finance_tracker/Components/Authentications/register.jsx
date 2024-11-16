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
    console.log(value, name);
    console.log(value);
    setFormData((prev)=>({
      ...prev,
      [name] : value
    }));
    console.log(formData)
    
  };

const handleSubmit =  (e) => {
  e.preventDefault();
  console.log("form",formData)

  axios.post("https://financetracker-zgc4.onrender.com/project/save", formData)
  .then((response) => {
    console.log("Data saved successfully:", response.data);
    alert("Data saved");
  })
  .catch((error) => {
    console.error("Error saving data:", error);
    alert("Failed to save data");
  });

  console.log(formData)
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
          <Link style={{ textDecoration: 'none', color: '#ff4141' }} to="/login">
            login here
          </Link>
        </p>
      
      </div>
    </div>
  );
}

export default Register;


