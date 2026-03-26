package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.CommentDTO;
import com.openclassrooms.mddapi.dto.FeedDTO;
import com.openclassrooms.mddapi.dto.PostDTO;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.service.PostService;
import com.openclassrooms.mddapi.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final TopicRepository topicRepository;

    public PostController(PostService postService,
                          UserService userService,
                          UserRepository userRepository,
                          TopicRepository topicRepository) {
        this.postService = postService;
        this.userService = userService;
        this.userRepository = userRepository;
        this.topicRepository = topicRepository;
    }

    // Fil d'actualité
    @GetMapping("/feed")
    public List<FeedDTO> getFeed(@RequestParam(defaultValue = "desc") String sort, Authentication authentication) {
        String email = authentication.getName();
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        return postService.getFeed(user.getId(), sort);
    }

    // Ajouter un article
    @PostMapping
    public PostDTO addPost(@RequestBody Map<String, String> body,
                           Authentication authentication) {
        String email = authentication.getName();
        User user = userService.findByEmail(email)
                .orElseThrow();

        Long topicId = Long.valueOf(body.get("topicId"));
        String title = body.get("title");
        String content = body.get("content");

        return postService.addPost(user.getId(), topicId, title, content,
                userRepository, topicRepository);
    }

    // Lire un article
    @GetMapping("/{id}")
    public PostDTO getPost(@PathVariable Long id) {
        return postService.getPost(id);
    }

    // Ajouter un commentaire
    @PostMapping("/{id}/comments")
    public CommentDTO addComment(@PathVariable Long id,
                                 @RequestBody Map<String, String> body,
                                 Authentication authentication) {
        String email = authentication.getName();
        User user = userService.findByEmail(email)
                .orElseThrow();

        String content = body.get("content");
        return postService.getCommentService().addComment(id, user.getId(), content);
    }
}