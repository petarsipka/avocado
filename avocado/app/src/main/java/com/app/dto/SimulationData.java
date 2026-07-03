package com.app.dto;

import com.app.Flight;
import com.app.FlightStatusEvent;

import java.util.List;

public class SimulationData {

    private List<Flight> flights;
    private List<FlightStatusEvent> events;

    public SimulationData() {}

    public SimulationData(List<Flight> flights, List<FlightStatusEvent> events) {
        this.flights = flights;
        this.events = events;
    }

    public List<Flight> getFlights() { return flights; }
    public void setFlights(List<Flight> flights) { this.flights = flights; }

    public List<FlightStatusEvent> getEvents() { return events; }
    public void setEvents(List<FlightStatusEvent> events) { this.events = events; }
}
