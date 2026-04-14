package com.openclassrooms.mddapi.dto;

import java.time.LocalDateTime;

public class FeedDTO {
    private Long id;
    private String title;
    private String content;
    private String authorUsername;
    private String topicTitle;
    private LocalDateTime createdAt;

    public FeedDTO(
            Long id,
            String title,
            String content,
            String authorUsername,
            String topicTitle,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.authorUsername = authorUsername;
        this.topicTitle = topicTitle;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthorUsername() {
        return authorUsername;
    }

    public String getTopicTitle() {
        return topicTitle;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}