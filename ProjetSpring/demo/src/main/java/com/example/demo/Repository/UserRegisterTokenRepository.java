package com.example.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.UserRegisterToken;

public interface UserRegisterTokenRepository extends JpaRepository<UserRegisterToken, Integer>{

	Optional<UserRegisterToken> findByToken(String token);
	void deleteByUserId(Long userId);
}