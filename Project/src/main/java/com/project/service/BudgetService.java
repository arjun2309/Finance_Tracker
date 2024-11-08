package com.project.service;

import java.util.List;
import java.util.Optional;

import com.project.dto.BudgetDto;
import com.project.model.BudgetModel;

public interface BudgetService {

	public BudgetModel saveBudgets(BudgetDto budgetDto);
	
	public List<BudgetDto> getAllBudgets();

 public Optional<BudgetModel> deleteBudget(long id);
 
}
