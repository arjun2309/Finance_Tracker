package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.model.ExpenseModel;

public interface ExpenseRepository extends JpaRepository<ExpenseModel,Long> {

	
}
