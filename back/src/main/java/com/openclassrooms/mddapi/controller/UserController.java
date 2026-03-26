package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.UserDTO;
import com.openclassrooms.mddapi.dto.UserProfileDTO;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.SubscriptionService;
import com.openclassrooms.mddapi.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final SubscriptionService subscriptionService;

    public UserController(UserService userService, SubscriptionService subscriptionService) {
        this.userService = userService;
        this.subscriptionService = subscriptionService;
    }

    @GetMapping("/me")
    public UserProfileDTO getProfile(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        List<String> subscriptions = subscriptionService.getUserSubscriptions(user.getId())
                .stream()
                .map(Topic::getName)
                .toList();

        return new UserProfileDTO(user.getEmail(), user.getUsername(), subscriptions);
    }

    @PutMapping("/me")
    public UserProfileDTO updateProfile(@RequestBody UserDTO request,
                                        Authentication authentication) {

        String email = authentication.getName();
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(userService.encodePassword(request.getPassword()));
        }

        userService.save(user);

        List<String> subscriptions = subscriptionService.getUserSubscriptions(user.getId())
                .stream()
                .map(Topic::getName)
                .toList();

        return new UserProfileDTO(user.getEmail(), user.getUsername(), subscriptions);
    }
}