package com.openclassrooms.mddapi.dto;

import java.util.List;

public class UserProfileDTO {
    private final String email;
    private final String username;
    private final List<TopicDTO> subscriptions; // titres des thèmes abonnés

    public UserProfileDTO(String email, String username, List<TopicDTO> subscriptions) {
        this.email = email;
        this.username = username;
        this.subscriptions = subscriptions;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public List<TopicDTO> getSubscriptions() {
        return subscriptions;
    }
}