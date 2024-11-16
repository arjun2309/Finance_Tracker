import './App.css';
import { BrowserRouter, Route, Routes,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import React from 'react';

import Login from './Finance_tracker/Components/Authentications/login';
import Register from './Finance_tracker/Components/Authentications/register';
import NavibarComponents from './Finance_tracker/Components/navibar';
import Budget from './Finance_tracker/Components/Budgets/budget';
import Expense from './Finance_tracker/Components/Expenses/expense';
import Reports from './Finance_tracker/Components/Reports/reports';
import Dashboard from './Finance_tracker/Components/Dashboard/dashboard';


function App() {

const [isAuthenticated,setIsAuthenticated]=useState(false)
const [userName,setUserName]=useState('');

const handleSignInSuccess=(nameUser)=>{
  setIsAuthenticated(true);
  setUserName(nameUser);
  localStorage.setItem("username",nameUser)
};

const AppNavigate=()=>{
const navigate = useNavigate();

const handleLogout = () => {
  
  setIsAuthenticated(false);
  setUserName('');
  localStorage.removeItem("username");
  navigate('/login'); // Redirect to the login page
};

return (
  
    <>
          
      {isAuthenticated &&<NavibarComponents isAuthenticated={isAuthenticated}  handleLogout={handleLogout}/>}
    
      <Routes>
       
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login handleSignInSuccess={handleSignInSuccess} />}/>
        {isAuthenticated ?(
          <>
          <Route path="/dashboard" element ={<Dashboard username={userName}/>}/>
        <Route path="/budgets" element ={<Budget username={userName}/>}/>
        <Route path="/expense" element={<Expense username={userName}/>}/>
        <Route path="/reports" element={<Reports username={userName}/>}/>
        </>
        ):(
          <Route path="/" element={<Login handleSignInSuccess={handleSignInSuccess} />}/>
        )}
      </Routes>
   </>
  );
};
return (
  <div className="App">
    <BrowserRouter>
      <AppNavigate />
    </BrowserRouter>
  </div>
);
}

export default App;
