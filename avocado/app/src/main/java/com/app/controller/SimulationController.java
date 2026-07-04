package com.app.controller;

import com.app.DistanceCategory;
import com.app.dto.CepResult;
import com.app.dto.SimulationData;
import com.app.dto.SimulationRequest;
import com.app.service.CepService;
import com.app.service.FlightSimulation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SimulationController {

    private final CepService cepService;
    private final FlightSimulation flightSimulation;

    @Autowired
    public SimulationController(CepService cepService, FlightSimulation flightSimulation) {
        this.cepService = cepService;
        this.flightSimulation = flightSimulation;
    }

    @PostMapping("/simulation")
    public CepResult simulate(@RequestBody SimulationRequest request) {
        SimulationData data;
        if ("ana".equalsIgnoreCase(request.getScenario())) {
            data = flightSimulation.anaScenario();
        } else if ("cancellation".equalsIgnoreCase(request.getScenario())) {
            data = flightSimulation.cancellationScenario();
        } else {
            data = flightSimulation.delayScenario("LH1411", DistanceCategory.MEDIUM, 190);
        }
        return cepService.simulate(data);
    }

    @PostMapping("/simulation/custom")
    public CepResult simulateCustom(@RequestBody SimulationData data) {
        return cepService.simulate(data);
    }
}
