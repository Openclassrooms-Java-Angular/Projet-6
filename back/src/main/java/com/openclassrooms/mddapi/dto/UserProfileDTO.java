package com.openclassrooms.mddapi.dto;

import java.util.List;

public class UserProfileDTO {
    private String email;
    private String username;
    private List<String> subscriptions; // titres des thèmes abonnés

    public UserProfileDTO(String email, String username, List<String> subscriptions) {
        this.email = email;
        this.username = username;
        this.subscriptions = subscriptions;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getSubscriptions() {
        return subscriptions;
    }

    public void setSubscriptions(List<String> subscriptions) {
        this.subscriptions = subscriptions;
    }
}