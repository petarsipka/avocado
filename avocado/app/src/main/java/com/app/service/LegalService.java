package com.app.service;

import com.app.Advice;
import com.app.Compensation;
import com.app.Flight;
import com.app.Incident;
import com.app.Passenger;
import com.app.Right;
import com.app.dto.LegalResultResponse;
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

    public LegalResultResponse processIncident(Flight flight, Passenger passenger, Incident incident) {
        KieSession session = kieContainer.newKieSession("ksession-rules");
        session.insert(flight);
        if (passenger != null) {
            session.insert(passenger);
        }
        if (incident != null) {
            session.insert(incident);
        }

        session.getAgenda().getAgendaGroup("level4").setFocus();
        session.getAgenda().getAgendaGroup("level3").setFocus();
        session.getAgenda().getAgendaGroup("level2").setFocus();
        session.getAgenda().getAgendaGroup("level1").setFocus();
        session.fireAllRules();

        LegalResultResponse result = new LegalResultResponse();
        result.setRegulationApplicable(flight.getIsRegulationApplicable());
        result.setDistanceCategory(flight.getDistanceCategory() != null ? flight.getDistanceCategory().name() : null);
        for (Object o : session.getObjects()) {
            if (o instanceof Compensation) {
                result.getCompensations().add((Compensation) o);
            } else if (o instanceof Right) {
                result.getRights().add((Right) o);
            } else if (o instanceof Advice) {
                result.getAdvice().add((Advice) o);
            }
        }

        session.dispose();
        return result;
    }
}
