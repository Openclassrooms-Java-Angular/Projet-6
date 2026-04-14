package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.TopicDTO;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.repository.TopicRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService {
    private final TopicRepository topicRepository;

    public TopicService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    public List<Topic> getTopics() {
        return topicRepository.findAll();
    }

    public List<TopicDTO> getAllTopicsForUser(Long userId) {
        return topicRepository.findAllWithSubscriptionStatus(userId)
                .stream()
                .map(p -> new TopicDTO(
                        p.getId(),
                        p.getName(),
                        p.getDescription(),
                        p.getSubscribed() == 1
                ))
                .toList();
    }
}
