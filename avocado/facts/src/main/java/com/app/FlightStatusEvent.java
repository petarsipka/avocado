package com.app;

import java.io.Serializable;

public class FlightStatusEvent implements Serializable {

    private String flightId;
    private FlightStatus status;
    private long timestamp;
    private int delayMinutes;
    private String reservationId;
    private long scheduledDepartureTs;

    public FlightStatusEvent() {}

    public FlightStatusEvent(String flightId, FlightStatus status, long timestamp, int delayMinutes, String reservationId) {
        this.flightId = flightId;
        this.status = status;
        this.timestamp = timestamp;
        this.delayMinutes = delayMinutes;
        this.reservationId = reservationId;
    }

    public String getFlightId() { return flightId; }
    public void setFlightId(String flightId) { this.flightId = flightId; }

    public FlightStatus getStatus() { return status; }
    public void setStatus(FlightStatus status) { this.status = status; }

    public long getTimestamp() { return timestamp; }
    public void setTimestamp(long timestamp) { this.timestamp = timestamp; }

    public int getDelayMinutes() { return delayMinutes; }
    public void setDelayMinutes(int delayMinutes) { this.delayMinutes = delayMinutes; }

    public String getReservationId() { return reservationId; }
    public void setReservationId(String reservationId) { this.reservationId = reservationId; }

    public long getScheduledDepartureTs() { return scheduledDepartureTs; }
    public void setScheduledDepartureTs(long scheduledDepartureTs) { this.scheduledDepartureTs = scheduledDepartureTs; }
}
