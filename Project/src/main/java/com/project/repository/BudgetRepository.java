package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.model.BudgetModel;

public interface BudgetRepository extends JpaRepository<BudgetModel,Long>{

}
