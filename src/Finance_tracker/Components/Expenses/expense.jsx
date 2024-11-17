import React, { useEffect, useState } from "react";
// import Budget from "../Budgets/budget";
import axios from "axios";
import './expense.css';

const Expense=()=>{
    const [formData,setFormData]=useState({
        description:'',
        category:'',
        amount:'',
        date:''
    })

    const [expense,setExpense]=useState([]);
    const [budgets,setBudgets]=useState([]);
    const [error,setError]=useState('');

    const username = localStorage.getItem('username');


    useEffect(()=>{
        const fetchData=async()=>{
            try{
            const budgetRes=await axios.get('https://financetracker-zgc4.onrender.com/project/getbudgets');
            const expenseRes= await axios.get('https://financetracker-zgc4.onrender.com/project/getexpenses')
            setBudgets(budgetRes.data.filter(budget=>budget.username===username));
            setExpense(expenseRes.data.filter(expense=>expense.username===username));     
        }catch(err){
                setError('Error fetching data');
            }
            
        };
        fetchData();
    },[username]);

    const handleChange=(e)=>{
        const{name,value}=e.target;
        setFormData({...formData,[name]:value,});
        setError('');
    };
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const newExpense={...formData,id:Date.now(),username};
        const budget=budgets.find(b=>b.category===formData.category);
        if(!budget){
            setError('Selected category is not in the budget');
            return;
        }

        const total=expense.filter(exp=>exp.category===formData.category).reduce((sum,exp)=>sum+parseFloat(exp.amount),0);

        const newTotal=total+parseFloat(formData.amount);

        if(newTotal>budget.budgetlimit){
            setError(`Entered amount exeeds budget limit for ${formData.category} category`);
            return;
        }

        try{
            const res=await axios.post('https://financetracker-zgc4.onrender.com/project/saveexpenses',newExpense);
            setExpense([res.data,...expense]);

            setFormData({
                description:'',
                category:'',
                amount:'',
                date:''
            });
            setError('');
        }catch(err){
            setError('Failed to add expense');
        }
    };
    
    return(
        <div className="expense-container">
           
            <form onSubmit={handleSubmit} className="expense-form">
            <h3>Add New Expense</h3>
                <input 
                  type="text" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  placeholder="Description"
                  required
                />
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange} 
                  required
                >
                <option value="">Select Category</option>
                    {budgets.map(budget=>{
                    return(
                    <option key={budget.id} value={budget.category}>
                    {budget.category} (Budget: ${budget.budgetlimit})
                </option>
                    );
                })}
                </select>
                <input 
                  type="number" 
                  name="amount" 
                  value={formData.amount} 
                  onChange={handleChange} 
                  placeholder="Amount" 
                  min="0.01" step="0.01" 
                  required 
                />
                <input 
                  type="date" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  required
                />
                <button type="submit" className="btn">Add Expense</button>
            </form>
            {error && <p className="error">{error}</p>}
        
            <div className="expense-list">
            <h3>Expense List</h3>
            {expense.length>0 ?(
                <table className="table-li">
                    
                    <thead>
                      <tr>
                        <th>Description</th>
                         <th>Category</th>
                         <th>Amount</th>
                         <th>Date</th>
                      </tr>
                    </thead>
                   <tbody>
                    {expense.map((expense)=>(
                        <tr key={expense.id}>
                            <td>{expense.description}</td>
                            <td>{expense.category}</td>
                            <td>{parseFloat(expense.amount).toFixed(2)}</td>
                            <td>{expense.date}</td>
                        </tr>
                    ))}
                   </tbody>
                    
                </table>
            ):(
                <p>Expense List is Empty</p>
            )}
        </div>
        </div>
    )
}
export  default Expense;
