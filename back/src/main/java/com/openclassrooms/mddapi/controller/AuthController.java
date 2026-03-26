package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.LoginRequest;
import com.openclassrooms.mddapi.dto.UserDTO;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.security.JwtUtil;
import com.openclassrooms.mddapi.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO request) {

        authService.register(request);

        return ResponseEntity.ok("Utilisateur créé");
    }

    // Endpoint pour la connexion
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        User user = authService.login(request);

        String token = JwtUtil.generateToken(user.getEmail(), "user");
        return ResponseEntity.ok(Map.of("token", token));
    }
}