import React, { useEffect,useState } from 'react';
import axios from 'axios';
import './budget.css';

const Budget = () => {
  const [formData, setFormData] = useState({
    category: '',
    budgetlimit: '',
    month: '',
    year: ''
  });
  const [budgets, setBudgets] = useState([]);
  const [error, setError] = useState('');

  const username = localStorage.getItem('username');


  useEffect(() => {
    const fetchBudget=async()=>{
    try{
      const budgetResp=await axios.get(`http://localhost:8097/project/getbudgets?username=${username}`)
        
            setBudgets(budgetResp.data);
            console.log("budget",budgetResp.data);
        }
        catch(err)  {
            setError("Error fetching data");
        };
      };
      fetchBudget();
}, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { category, budgetlimit, month} = formData;

    try {
    const newBudget = {
       username: username,
      category,
      budgetlimit: parseFloat(budgetlimit),
      month
    };
    
    
    
      const response = await axios.post('http://localhost:8097/project/savebudgets', newBudget);
      console.log("new",newBudget)
      setBudgets((prev) => [...prev, response.data]); // Add new budget to list
      setFormData({ category: '', budgetlimit: '', month: '' }); // Clear form
      setError(''); 
      alert("Budget added successfully");
    } catch (err) {
      console.error('Error adding budget:', err);
      setError('Failed to add budget. Please try again.');
    }
  };
  const handleDelete=async(id)=>{
    if(window.confirm('Are you sure you want to delete this budget')){
        try{
            console.log(id)
            console.log("delete")
            await axios.delete(`http://localhost:8097/project/deletebudgets/${id}`);
            console.log("delete")
            setBudgets(budgets.filter(budget=>budget.id!==id));
            alert('Budget deleted successfully');
        }
        catch(err){
            alert('Failed to delete the budget.Please try again.');
        }
    }
};

  return (
    <div className="budget-page">
 
      <div className="budget-form">
        <h4>Add New Budget</h4>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="budgetlimit"
            placeholder="Limit"
            value={formData.budgetlimit}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
          <input
            type="month"
            name="month"
            value={formData.month}
            onChange={handleChange}
            required
          />
         
          <button type="submit" className="btn">Add Budget</button>
        </form>
      </div>

      <div className="budget-list">
        <h4>Budget List</h4>
        {budgets.length>0 ?(
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Limit</th>
                    <th>Month</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {budgets.slice().reverse().filter(budget=>(budget.username===username))
                .map(budget=>(
                    <tr key={budget.id}>
                        <td>{budget.category}</td>
                        <td>{parseFloat((budget.budgetlimit||0).toFixed(2))}</td>
                        <td>{budget.month}</td>
                        <td><button onClick={()=>handleDelete(budget.id)} className="btn delete-btn">Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        ):(
            <p>No budgets found</p>
        )}
    </div>
    </div>
  );
};

export default Budget;
