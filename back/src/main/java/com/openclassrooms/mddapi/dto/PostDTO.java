package com.openclassrooms.mddapi.dto;

import java.time.LocalDateTime;
import java.util.List;

public class PostDTO {
    private Long id;
    private String title;
    private String content;
    private String authorUsername;
    private String topicTitle;
    private LocalDateTime createdAt;
    private List<CommentDTO> comments;

    public PostDTO(
            Long id,
            String title,
            String content,
            String authorUsername,
            String topicTitle,
            LocalDateTime createdAt,
            List<CommentDTO> comments
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.authorUsername = authorUsername;
        this.topicTitle = topicTitle;
        this.createdAt = createdAt;
        this.comments = comments;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
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

    public List<CommentDTO> getComments() {
        return comments;
    }
}