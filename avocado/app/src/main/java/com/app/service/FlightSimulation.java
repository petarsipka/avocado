package com.app.service;

import com.app.DistanceCategory;
import com.app.Flight;
import com.app.FlightStatus;
import com.app.FlightStatusEvent;
import com.app.dto.SimulationData;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class FlightSimulation {

    private static final long MINUTE = 60_000L;

    public SimulationData anaScenario() {
        Flight lh1411 = new Flight("LH1411", true);
        lh1411.setReservationId("R1");
        lh1411.setDistanceCategory(DistanceCategory.MEDIUM);

        Flight lh1860 = new Flight("LH1860", true);
        lh1860.setReservationId("R1");
        lh1860.setDistanceCategory(DistanceCategory.MEDIUM);

        List<Flight> flights = Arrays.asList(lh1411, lh1860);

        List<FlightStatusEvent> events = new ArrayList<>();
        events.add(new FlightStatusEvent("LH1411", FlightStatus.ON_TIME, 0, 0, "R1"));
        events.add(new FlightStatusEvent("LH1411", FlightStatus.DELAYED, 90 * MINUTE, 60, "R1"));
        events.add(new FlightStatusEvent("LH1411", FlightStatus.DELAYED, 135 * MINUTE, 120, "R1"));
        events.add(new FlightStatusEvent("LH1860", FlightStatus.DEPARTED, 210 * MINUTE, 0, "R1"));
        events.add(new FlightStatusEvent("LH1411", FlightStatus.LANDED, 235 * MINUTE, 0, "R1"));

        return new SimulationData(flights, events);
    }

    public SimulationData cancellationScenario() {
        Flight flight = new Flight("IB3151", true);
        flight.setReservationId("R-IB3151");
        flight.setDistanceCategory(DistanceCategory.SHORT);

        List<FlightStatusEvent> events = new ArrayList<>();
        events.add(new FlightStatusEvent("IB3151", FlightStatus.ON_TIME, 0, 0, "R-IB3151"));
        events.add(new FlightStatusEvent("IB3151", FlightStatus.CANCELLED, 30 * MINUTE, 0, "R-IB3151"));

        return new SimulationData(Collections.singletonList(flight), events);
    }

    public SimulationData delayScenario(String flightId, DistanceCategory category, int delayMinutes) {
        Flight flight = new Flight(flightId, true);
        flight.setReservationId("R-" + flightId);
        flight.setDistanceCategory(category);

        List<Flight> flights = Collections.singletonList(flight);

        List<FlightStatusEvent> events = new ArrayList<>();
        events.add(new FlightStatusEvent(flightId, FlightStatus.ON_TIME, 0, 0, flight.getReservationId()));
        events.add(new FlightStatusEvent(flightId, FlightStatus.DELAYED, 60 * MINUTE, delayMinutes, flight.getReservationId()));

        return new SimulationData(flights, events);
    }
}
