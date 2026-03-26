package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.CommentDTO;
import com.openclassrooms.mddapi.service.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts/{postId}/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public List<CommentDTO> getComments(@PathVariable Long postId) {
        return commentService.getCommentsForPost(postId);
    }

    /*@PostMapping
    public CommentDTO addComment(@PathVariable Long postId,
                                 @RequestBody Map<String, String> body,
                                 Authentication authentication) {

        String username = authentication.getName();
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        String content = body.get("content");
        return commentService.addComment(postId, user.getId(), content);
    }*/
}