package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    boolean existsByUserIdAndTopicId(Long userId, Long topicId);

    Optional<Subscription> findByUserIdAndTopicId(Long userId, Long topicId);

    List<Subscription> findAllByUserId(Long userId);
}