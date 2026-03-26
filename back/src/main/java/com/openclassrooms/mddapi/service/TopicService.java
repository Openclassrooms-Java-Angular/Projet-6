package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.TopicDTO;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.repository.TopicRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService implements ITopicService {
    private final TopicRepository topicRepository;

    public TopicService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    @Override
    public List<Topic> getTopics() {
        return topicRepository.findAll();
    }

    public List<TopicDTO> getAllTopicsForUser(Long userId) {
        return topicRepository.findAllWithSubscriptionStatus(userId)
                .stream()
                .map(p -> new TopicDTO(
                        p.getId(),
                        p.getTitle(),
                        p.getDescription(),
                        p.getSubscribed() == 1
                ))
                .toList();
    }
}
