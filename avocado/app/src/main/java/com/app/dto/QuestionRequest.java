package com.app.dto;

import com.app.Flight;
import com.app.Incident;
import com.app.Passenger;

public class QuestionRequest {

    private Flight flight;
    private Passenger passenger;
    private Incident incident;
    private String goal;

    public Flight getFlight() { return flight; }
    public void setFlight(Flight flight) { this.flight = flight; }

    public Passenger getPassenger() { return passenger; }
    public void setPassenger(Passenger passenger) { this.passenger = passenger; }

    public Incident getIncident() { return incident; }
    public void setIncident(Incident incident) { this.incident = incident; }

    public String getGoal() { return goal; }
    public void setGoal(String goal) { this.goal = goal; }
}
