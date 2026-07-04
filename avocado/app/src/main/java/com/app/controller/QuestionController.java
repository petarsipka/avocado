package com.app.controller;

import com.app.dto.QuestionRequest;
import com.app.dto.QuestionResponse;
import com.app.service.QueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class QuestionController {

    private final QueryService queryService;

    @Autowired
    public QuestionController(QueryService queryService) {
        this.queryService = queryService;
    }

    @PostMapping("/question")
    public QuestionResponse ask(@RequestBody QuestionRequest request) {
        return queryService.ask(request.getFlight(), request.getPassenger(),
                request.getIncident(), request.getGoal());
    }
}
