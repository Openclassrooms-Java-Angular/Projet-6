package com.openclassrooms.mddapi.repository.projection;

public interface TopicProjection {
    Long getId();
    String getTitle();
    String getDescription();
    Integer getSubscribed();
}