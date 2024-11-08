package com.project.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.project.dto.BudgetDto;
import com.project.dto.ExpenseDto;
import com.project.dto.SignUpDto;
import com.project.model.BudgetModel;
import com.project.model.ExpenseModel;
import com.project.model.SignUpModel;
import com.project.service.BudgetService;
import com.project.service.ExpenseService;
import com.project.service.SignUpService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/project")
public class SignUpController {
@Autowired
private SignUpService signupService;

@Autowired
private BudgetService budgetService;

@Autowired
private ExpenseService expenseService;

@PostMapping("/save")
public Map<String,Object> saveData(@RequestBody SignUpDto signupDto){
	SignUpModel msg =signupService.saveUserInfo(signupDto);
	Map<String,Object> response=new HashMap<>();
	if(msg!=null) {
		response.put("Status", HttpStatus.OK);
		response.put("message","Success");
		response.put("timestamp", new Date());
		return response;
	}
	response.put("Status", HttpStatus.BAD_REQUEST);
	response.put("message","Failure");
	response.put("timestamp", new Date());
	return response;
	
}

@GetMapping("/login")
public List<SignUpDto> getAllUserInfo(){
	return signupService.getAllUserInfo();
	
}

@PostMapping("/savebudgets")
public BudgetModel SaveBudget(@RequestBody BudgetDto budgetDto) {
	return budgetService.saveBudgets(budgetDto);
	
}

@GetMapping("/getbudgets")
public List<BudgetDto> getAllBudget(){
	return budgetService.getAllBudgets();
}

@DeleteMapping("/deletebudgets/{id}")
public Optional<BudgetModel> deleteBudget(@PathVariable long id) {
	return budgetService.deleteBudget(id);
}

@PostMapping("/saveexpenses")
public ExpenseModel SaveExpense(@RequestBody ExpenseDto expenseDto) {
	return expenseService.saveExpense(expenseDto);
}

@GetMapping("/getexpenses")
public List<ExpenseDto> getExpenses(){
	return expenseService.getExpenses();
}
}
