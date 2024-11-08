package com.project.dto;

public class ExpenseDto {

	private long id;
	private String description;
	private String category;
	private String amount;
	private String date;
	private String username;
	
	
	public ExpenseDto(long id,String description, String category, String amount, String date, String username) {
		super();
		this.id=id;
		this.description = description;
		this.category = category;
		this.amount = amount;
		this.date = date;
		this.username = username;
	}
	
	public ExpenseDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	
}
