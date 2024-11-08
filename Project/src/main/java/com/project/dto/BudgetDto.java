package com.project.dto;

public class BudgetDto {

	public long id;
	public String category;
	public double budgetlimit;
	public String username;
	public String month;
	
	public BudgetDto(long id, String category, double budgetlimit, String username, String month) {
		super();
		this.id = id;
		this.category = category;
		this.budgetlimit = budgetlimit;
		this.username = username;
		this.month = month;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public double getBudgetLimit() {
		return budgetlimit;
	}
	public void setBudgetLimit(double limit) {
		this.budgetlimit = limit;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	
	public BudgetDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
