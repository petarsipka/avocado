package com.app.service;

import com.app.Flight;
import com.app.Incident;
import com.app.Passenger;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.kie.api.runtime.rule.QueryResults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QueryService {

    private final KieContainer kieContainer;

    @Autowired
    public QueryService(KieContainer kieContainer) {
        this.kieContainer = kieContainer;
    }

    public boolean ask(Flight flight, Passenger passenger, Incident incident, String goal) {
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

        QueryResults results = session.getQueryResults(goal, flight.getFlightId());
        boolean satisfied = results.size() > 0;

        session.dispose();
        return satisfied;
    }
}
