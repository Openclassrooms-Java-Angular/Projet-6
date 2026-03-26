package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.TopicDTO;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.TopicService;
import com.openclassrooms.mddapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
public class TopicController {

    private final TopicService topicService;

    @Autowired
    private UserService userService;

    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }
    @GetMapping
    public List<TopicDTO> getTopics(Authentication authentication) {

        String email = authentication.getName();

        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        return topicService.getAllTopicsForUser(user.getId());
    }
}
