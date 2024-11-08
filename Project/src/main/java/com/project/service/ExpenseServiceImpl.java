package com.project.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.ExpenseDto;
import com.project.model.ExpenseModel;
import com.project.repository.ExpenseRepository;

@Service
public class ExpenseServiceImpl implements ExpenseService {

	@Autowired
	private ExpenseRepository expenseRepository;
	
	@Override
	public ExpenseModel saveExpense(ExpenseDto expensedto) {
		ExpenseModel expenseModel=new ExpenseModel();
		expenseModel.setId(expensedto.getId());
		expenseModel.setDescription(expensedto.getDescription());
		expenseModel.setCategory(expensedto.getCategory());
		expenseModel.setAmount(expensedto.getAmount());
		expenseModel.setDate(expensedto.getDate());
		expenseModel.setUsername(expensedto.getUsername());
		return expenseRepository.save(expenseModel);
	}
	
		@Override
		public List<ExpenseDto> getExpenses(){
			List<ExpenseModel> expenses=expenseRepository.findAll();
			return expenses.stream().map(expenses1->{
				ExpenseDto expenseDto=new ExpenseDto();
				expenseDto.setId(expenses1.getId());
				expenseDto.setDescription(expenses1.getDescription());
				expenseDto.setCategory(expenses1.getCategory());
				expenseDto.setAmount(expenses1.getAmount());
				expenseDto.setDate(expenses1.getDate());
				expenseDto.setUsername(expenses1.getUsername());
				return expenseDto;
			}).collect(Collectors.toList());
	}
}
