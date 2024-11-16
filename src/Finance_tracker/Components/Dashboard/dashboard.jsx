import React, { useEffect, useState } from "react";
import axios from "axios";
import './dashboard.css'; 

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [total,setTotal] = useState(0);
    const [error, setError] = useState("");

    const username=localStorage.getItem("username");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const expenseRes = await axios.get('http://localhost:8097/project/getexpenses');
                const userExpense=expenseRes.data.filter(expense=>expense.username===username);
                setExpenses(userExpense); 
           
                const totalExpense=userExpense.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
                setTotal(totalExpense);
                console.log("total",totalExpense);
            } catch (err) {
                setError("Error fetching data");
            }
        };
        fetchData();
    }, [username]);
    
    const data = expenses.reduce((acc, expense) => {
        const category = expense.category;
        const amount = parseFloat(expense.amount);

        if (!acc[category]) {
            acc[category] = { name: category, value: 0 };
        }
        acc[category].value += amount;

        return acc;
    }, {});

    const expensesByCategory = expenses.filter(expense=>expense.username===username).reduce((acc, expense) => {
        
        const category = expense.category;
        const amount = parseFloat(expense.amount);
        
        
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += amount;

        return acc;
    }, {});

    return (
        <div className="dashboard-container" style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Dashboard</h2>
            
            {error && <p className="error">{error}</p>}
            <h3>Total Expenses: ${total.toFixed(2)}</h3>
            <h4>Summary of Expenses by Category</h4>
            <table className="summary-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Category</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(expensesByCategory).map(([category, amount]) => (
                        <tr key={category}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{category}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>${amount.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
