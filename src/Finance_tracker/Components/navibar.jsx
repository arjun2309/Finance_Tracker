import React, {  useState } from 'react';
import './navibar.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link} from 'react-router-dom';
 import {FaUser } from "react-icons/fa";
 

const NavibarComponents = ({isAuthenticated,handleLogout}) => {
  
    const [menu,SetMenu]=useState("");
    
    const username = localStorage.getItem('username')
   
  return (
    <>
 {  isAuthenticated ? (<div className='nav_bar'>
    <div className="nav_container">
        <div className="nav_left">
           <div className='brand'>
      
            <p className="name"><Link style={{textDecoration:"none" ,color:'#ddd'}}to={"/dashboard"}>FinanceTracker</Link></p>
            </div>
            <ul className="nav_menu">
                    <li onClick={()=>{SetMenu("dashboard")}}><Link style={{textDecoration:"none" ,color:'#ddd'}}  
                    to={"/dashboard"}>Dashboard</Link> {menu==="dashboard"?<hr />:null} </li>
                    <li onClick={()=>{SetMenu("expense")}}><Link style={{textDecoration:"none",color:'#ddd'}} 
                    to={"/expense"}>Expenses</Link>{menu==="expense"?<hr />:null}</li>
                    <li onClick={()=>{SetMenu("budgets")}}><Link style={{textDecoration:"none",color:'#ddd'}}
                    to={"/budgets"}>Budgets</Link> {menu==="budgets"?<hr />:null} </li>
                      <li onClick={()=>{SetMenu("reports")}}><Link style={{textDecoration:"none",color:'#ddd'}} 
                    to={"/reports"}>Reports</Link>  {menu==="reports"?<hr />:null}</li>  
                 </ul>
           </div>
        <div className='right_nav'>
            <div className="user">
            <span><FaUser/></span>
              <p>{username}</p>
              <button onClick={handleLogout} className="logout-btn"><FaSignOutAlt /></button>
            </div>
           
        </div>
    </div>
    </div>): null}
    </>
  )
}

export default NavibarComponents;


