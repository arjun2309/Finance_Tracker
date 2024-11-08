package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.model.SignUpModel;

public interface SignUpRepository extends JpaRepository<SignUpModel,Long>{


}
