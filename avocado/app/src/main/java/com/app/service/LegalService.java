package com.app.service;

import com.app.Flight;
import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LegalService {
    private final KieContainer kieContainer;

    @Autowired
    public LegalService(KieContainer kieContainer) {
        this.kieContainer = kieContainer;
    }

    public Flight processFlight(Flight flight) {
        KieSession session = kieContainer.newKieSession("ksession-rules");
        session.insert(flight);
        session.fireAllRules();
        session.dispose();
        return flight;
    }
}
