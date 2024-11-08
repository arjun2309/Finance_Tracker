package com.project.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.SignUpDto;
import com.project.model.SignUpModel;
import com.project.repository.SignUpRepository;

@Service
public class SignUpServiceImpl implements SignUpService {
@Autowired
private SignUpRepository signupRepository;

@Override
public SignUpModel saveUserInfo(SignUpDto signupDto) {
	
	SignUpModel signUpModel = new SignUpModel();
	signUpModel.setId(signupDto.getId());
	signUpModel.setUsername(signupDto.getUsername());
	signUpModel.setEmail(signupDto.getEmail());
	signUpModel.setPassword(signupDto.getPassword());
	return signupRepository.save(signUpModel);
}
@Override
public List<SignUpDto> getAllUserInfo(){
	List <SignUpModel> signUp=signupRepository.findAll();
	return signUp.stream().map(signUp1->{
		SignUpDto signUpDto=new SignUpDto();
		signUpDto.setId(signUp1.getId());
		signUpDto.setEmail(signUp1.getEmail());
		signUpDto.setPassword(signUp1.getPassword());
		signUpDto.setUsername(signUp1.getUsername());
		return signUpDto;
	}).collect(Collectors.toList());
	
}
}
