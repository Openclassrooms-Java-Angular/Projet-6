package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.repository.projection.TopicProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long>
{
    @Query(value = """
        SELECT
            t.id,
            t.title,
            t.description,
            (s.user_id IS NOT NULL) AS subscribed
        FROM topics t
        LEFT JOIN subscriptions s
            ON t.id = s.topic_id AND s.user_id = :userId
    """, nativeQuery = true)
    List<TopicProjection> findAllWithSubscriptionStatus(@Param("userId") Long userId);
}
