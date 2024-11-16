import React, { useState, useEffect } from 'react';
import './login.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import {handleSignInSuccess} from '../../../App'
// npm i axios

const Login = ({handleSignInSuccess}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storage, setStorage] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    axios.get("https://financetracker-chv8.onrender.com/project/login")
      .then((res) => {
        console.log("Data fetched successfully", res.data);
        setStorage(res.data);
      })
      .catch((err) => {
        console.log("Data Error", err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    if (email && password) {
        console.log("prints");
      const user = storage.find((user) => user.email === email && user.password === password);
      if (user) {
        console.log(user)
        var nameUser= user.username;
       
        handleSignInSuccess(nameUser)
        alert("You are logged in")
        navigate("/dashboard");
        console.log('Login successful for user:', nameUser);
      } else {
        alert('Login failed. Invalid email or password.');
      }
    } else {
      alert('Please provide both email and password.');
    }
  };

  return (
    <div>
      <div className="sign_cont">
        <div className="signin_page">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="signin_fields">
              <input
                type="email"
                name="email"
                placeholder="Your Emails"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="submit_cont">
              
              <button className='submit-log'type="submit">Submit</button>
              <p>Forgot Password?</p>
            </div>
          </form>

          <p style={{marginLeft:"-120px",width:"600px"}}> 
            I don't have an account 
            <Link style={{ marginLeft:"10px",textDecoration: "none", color: "#ff4141" }} to="/Register">
               register here
            </Link>
          </p>
        </div>
      </div>
    </div>)}

export default Login;
