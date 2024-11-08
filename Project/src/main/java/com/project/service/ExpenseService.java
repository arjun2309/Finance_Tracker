package com.project.service;

import java.util.List;

import com.project.dto.ExpenseDto;
import com.project.model.ExpenseModel;

public interface ExpenseService {

	ExpenseModel saveExpense(ExpenseDto expensedto);
	public List<ExpenseDto> getExpenses();
	
}
