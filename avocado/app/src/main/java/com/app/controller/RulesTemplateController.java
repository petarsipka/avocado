package com.app.controller;

import com.app.Right;
import com.app.dto.ThresholdRequest;
import com.app.service.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RulesTemplateController {

    private final TemplateService templateService;

    @Autowired
    public RulesTemplateController(TemplateService templateService) {
        this.templateService = templateService;
    }

    @PostMapping("/rules/threshold")
    public List<Right> apply(@RequestBody ThresholdRequest request) {
        return templateService.applyThresholds(request.getThresholds(), request.getIncident());
    }
}
