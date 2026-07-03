package com.app.controller;

import com.app.dto.IncidentRequest;
import com.app.dto.LegalResultResponse;
import com.app.service.LegalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class IncidentController {

    private final LegalService legalService;

    @Autowired
    public IncidentController(LegalService legalService) {
        this.legalService = legalService;
    }

    @PostMapping("/incident")
    public LegalResultResponse assess(@RequestBody IncidentRequest request) {
        return legalService.processIncident(request.getFlight(), request.getPassenger(), request.getIncident());
    }
}
