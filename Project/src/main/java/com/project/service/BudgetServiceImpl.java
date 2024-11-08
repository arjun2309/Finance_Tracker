package com.project.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.BudgetDto;
import com.project.model.BudgetModel;
import com.project.repository.BudgetRepository;


@Service
public class BudgetServiceImpl implements BudgetService {

	@Autowired
	private BudgetRepository budgetRepository;
	
	@Override
	public BudgetModel saveBudgets(BudgetDto budgetDto) {
		BudgetModel budgetModel=new BudgetModel();
		budgetModel.setId(budgetDto.getId());
		budgetModel.setUsername(budgetDto.getUsername());
		budgetModel.setCategory(budgetDto.getCategory());
		budgetModel.setBudgetLimit(budgetDto.getBudgetLimit());
		budgetModel.setMonth(budgetDto.getMonth());
		return budgetRepository.save(budgetModel);
		
	}
	
	@Override
	public List<BudgetDto> getAllBudgets(){
		List<BudgetModel> budget=budgetRepository.findAll();
		return budget.stream().map(budget1->{
			BudgetDto budgetDto=new BudgetDto();
			budgetDto.setId(budget1.getId());
			budgetDto.setCategory(budget1.getCategory());
			budgetDto.setBudgetLimit(budget1.getBudgetLimit());
			budgetDto.setMonth(budget1.getMonth());
			budgetDto.setUsername(budget1.getUsername());
			return budgetDto;
		}).collect(Collectors.toList());
	}
	
	@Override
	public  Optional<BudgetModel> deleteBudget(long id) {
		Optional<BudgetModel> budget = budgetRepository.findById(id);
		budgetRepository.deleteById(id);
		return budget;
		
	}
}
