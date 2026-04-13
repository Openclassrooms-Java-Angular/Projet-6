package com.openclassrooms.mddapi.repository.projection;

public interface TopicProjection {
    Long getId();
    String getName();
    String getDescription();
    Integer getSubscribed();
}