import React, { useEffect, useState } from "react";
import axios from "axios";
import './reports.css';

const Reports = () => {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [error, setError] = useState("");

    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const expenseRes = await axios.get('http://localhost:8097/project/getexpenses');
                const budgetRes = await axios.get('http://localhost:8097/project/getbudgets');
                setExpenses(expenseRes.data.filter(exp => exp.username === username));

                const categories = budgetRes.data
                    .filter(budget => budget.username === username)
                    .map(budget => budget.category);
                setCategories([...new Set(categories)]);
            } catch (err) {
                setError("Error fetching data");
            }
        };
        fetchData();
    }, [username]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
    
        if (new Date(startDate) > new Date(endDate)) {
            setError("Start date cannot be after end date");
            return;
        }
        const filtered = expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return (
                expense.category === selectedCategory &&
                expenseDate >= new Date(startDate) &&
                expenseDate <= new Date(endDate)
            );
        });
    
    
        if (filtered.length === 0) {
            setError("No expenses found for the selected criteria");
        } else {
            setError("");
        }
    
        setFilteredExpenses(filtered);
    };
    

    return (
        <div className="report-container">
            <form className="report-form" onSubmit={handleSubmit}>
            <h2>Expense Report</h2>
                <select className="input" value={selectedCategory} onChange={(e) => 
                    setSelectedCategory(e.target.value)} required>
                    <option value="">Select Category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
                <input className="input"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
                <input className="input"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
                <button type="submit" className="btn-report">Generate Report</button>
            </form>
            {error && <p className="error">{error}</p>}

           <div className="table-report">
            <h4>Filtered Expenses</h4>
            {filteredExpenses.length > 0 ? (
                <table className="table-rep">
                    <thead>
                        <tr>
                         <th>Description</th>
                         <th>Category</th>
                         <th>Amount</th>
                         <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredExpenses.map(expense => (
                        <tr>
                            <td>{expense.description}</td>
                            <td>{expense.category}</td>
                            <td>${parseFloat(expense.amount).toFixed(2)}</td>
                            <td>{expense.date}</td>
                        </tr>
                    ))}
                   </tbody>
                   </table>
            ) : (
                <p>No expenses found for the selected criteria.</p>
            )}
        </div>
        </div>
    );
};

export default Reports;
