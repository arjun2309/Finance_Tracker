package com.project.service;

import java.util.List;

import com.project.dto.SignUpDto;
import com.project.model.SignUpModel;

public interface SignUpService {

	public SignUpModel saveUserInfo(SignUpDto signupDto);
	
	public List<SignUpDto> getAllUserInfo();
}
