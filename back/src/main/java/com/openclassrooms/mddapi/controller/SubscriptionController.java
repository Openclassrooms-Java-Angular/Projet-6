package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.SubscriptionService;
import com.openclassrooms.mddapi.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/topics")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;
    private final UserService userService;

    public SubscriptionController(SubscriptionService subscriptionService,
                                  UserService userService) {
        this.subscriptionService = subscriptionService;
        this.userService = userService;
    }

    @PostMapping("/{topicId}/subscribe")
    public void subscribe(@PathVariable Long topicId, Authentication authentication) {

        String email = authentication.getName();
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        subscriptionService.subscribe(user.getId(), topicId);
    }

    @DeleteMapping("/{topicId}/unsubscribe")
    public void unsubscribe(@PathVariable Long topicId, Authentication authentication) {

        String email = authentication.getName();
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        subscriptionService.unsubscribe(user.getId(), topicId);
    }
}