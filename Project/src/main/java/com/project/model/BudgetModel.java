package com.project.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name="Budgets")
public class BudgetModel {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
	@Column(name="username")
	private String username;
	@Column(name="category")
	private String category;
	@Column(name="budgetLimit")
	private double budgetlimit;
	@Column(name="month")
	private String month;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
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
	public void setBudgetLimit(double d) {
		this.budgetlimit = d;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	
	
}
