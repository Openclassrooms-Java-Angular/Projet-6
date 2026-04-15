package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.LoginRequest;
import com.openclassrooms.mddapi.dto.UserDTO;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.security.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public User register(UserDTO request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Un compte avec cette adresse e-mail existe déjà");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Un compte avec ce nom d'utilisateur existe déjà");
        }

        User user = new User(
                request.getUsername(),
                request.getEmail(),
                this.encodePassword(request.getPassword())
        );
        userRepository.save(user);

        return user;
    }

    public User login(LoginRequest request) {

        if (request.getLogin() == null || request.getLogin().isBlank() ||
                request.getPassword() == null || request.getPassword().isBlank()) {
            throw new AuthenticationException();
        }

        User user = userRepository
                .findByEmailIgnoreCaseOrUsernameIgnoreCase(request.getLogin(), request.getLogin())
                .orElseThrow(AuthenticationException::new);

        if (!this.checkPassword(request.getPassword(), user.getPassword())) {
            throw new AuthenticationException();
        }

        return user;
    }
}