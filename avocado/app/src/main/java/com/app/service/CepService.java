package com.app.service;

import com.app.Flight;
import com.app.FlightStatusEvent;
import com.app.MissedConnection;
import com.app.Notification;
import com.app.dto.CepResult;
import com.app.dto.SimulationData;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.kie.api.runtime.rule.EntryPoint;
import org.kie.api.time.SessionPseudoClock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class CepService {

    private final KieContainer kieContainer;

    @Autowired
    public CepService(KieContainer kieContainer) {
        this.kieContainer = kieContainer;
    }

    public CepResult simulate(SimulationData data) {
        KieSession session = kieContainer.newKieSession("cep-session");
        SessionPseudoClock clock = session.getSessionClock();
        EntryPoint stream = session.getEntryPoint("flight-status-stream");

        for (Flight flight : data.getFlights()) {
            session.insert(flight);
        }

        for (FlightStatusEvent event : data.getEvents()) {
            long diff = event.getTimestamp() - clock.getCurrentTime();
            if (diff > 0) {
                clock.advanceTime(diff, TimeUnit.MILLISECONDS);
            }
            stream.insert(event);
            session.fireAllRules();
        }

        CepResult result = new CepResult();
        for (Object o : session.getObjects()) {
            if (o instanceof Notification) {
                result.getNotifications().add((Notification) o);
            } else if (o instanceof MissedConnection) {
                result.getMissedConnections().add((MissedConnection) o);
            }
        }

        session.dispose();
        return result;
    }
}
