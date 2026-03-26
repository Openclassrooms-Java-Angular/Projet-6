package com.openclassrooms.mddapi.dto;

public class TopicDTO {
    private Long id;
    private String title;
    private String description;
    private boolean subscribed;

    public TopicDTO(Long id, String title, String description, boolean subscribed) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.subscribed = subscribed;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public boolean isSubscribed() {
        return subscribed;
    }
}