package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.model.Subscription;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final TopicRepository topicRepository;

    public SubscriptionService(SubscriptionRepository subscriptionRepository,
                               UserRepository userRepository,
                               TopicRepository topicRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
        this.topicRepository = topicRepository;
    }

    public void subscribe(Long userId, Long topicId) {
        // éviter doublon
        boolean exists = subscriptionRepository.existsByUserIdAndTopicId(userId, topicId);
        if (exists) {
            throw new RuntimeException("Déjà abonné");
        }

        Subscription sub = new Subscription();
        sub.setUser(userRepository.getReferenceById(userId));
        sub.setTopic(topicRepository.getReferenceById(topicId));
        sub.setSubscribedAt(LocalDateTime.now());

        subscriptionRepository.save(sub);
    }

    public void unsubscribe(Long userId, Long topicId) {
        Subscription subscription = subscriptionRepository
                .findByUserIdAndTopicId(userId, topicId)
                .orElseThrow(() -> new RuntimeException("Abonnement introuvable"));

        subscriptionRepository.delete(subscription);
    }

    public List<Topic> getUserSubscriptions(Long userId) {
        return subscriptionRepository.findAllByUserId(userId)
                .stream()
                .map(Subscription::getTopic)
                .toList();
    }
}