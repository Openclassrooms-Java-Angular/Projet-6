package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.FeedDTO;
import com.openclassrooms.mddapi.dto.PostDTO;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final CommentService commentService;

    public PostService(PostRepository postRepository, CommentService commentService) {
        this.postRepository = postRepository;
        this.commentService = commentService;
    }

    public CommentService getCommentService() {
        return commentService;
    }

    // Fil d'actualité simple
    public List<FeedDTO> getFeed(Long userId, String sort) {
        // récupère tous les articles liés aux thèmes auxquels l'utilisateur est abonné, triés par date de création croissante ou décroissante
        Sort result = Objects.equals(sort, "asc") ? Sort.by("createdAt").ascending() : Sort.by("createdAt").descending();
        List<Post> posts = postRepository.findDistinctByTopicSubscriptionsUserId(userId, result);

        return posts.stream()
                .map(post -> new FeedDTO(
                        post.getId(),
                        post.getTitle(),
                        post.getContent(),
                        post.getAuthor().getUsername(),
                        post.getTopic().getName(),
                        post.getCreatedAt()
                ))
                .toList();
    }

    // Ajouter un article
    public PostDTO addPost(Long userId, Long topicId, String title, String content,
                           UserRepository userRepository, TopicRepository topicRepository) {
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setCreatedAt(LocalDateTime.now());
        post.setAuthor(userRepository.getReferenceById(userId));
        post.setTopic(topicRepository.getReferenceById(topicId));

        Post saved = postRepository.save(post);
        return new PostDTO(
                saved.getId(),
                saved.getTitle(),
                saved.getContent(),
                saved.getAuthor().getUsername(),
                saved.getTopic().getName(),
                saved.getCreatedAt(),
                List.of() // aucun commentaire au départ
        );
    }

    // Lire un article avec ses commentaires
    public PostDTO getPost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post introuvable"));
        return new PostDTO(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getAuthor().getUsername(),
                post.getTopic().getName(),
                post.getCreatedAt(),
                commentService.getCommentsForPost(postId)
        );
    }
}