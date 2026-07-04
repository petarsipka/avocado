package com.app;

import java.io.Serializable;

public class SegmentDelay implements Serializable {

    private String reservationId;
    private String flightId;
    private int delayMinutes;

    public SegmentDelay() {}

    public SegmentDelay(String reservationId, String flightId, int delayMinutes) {
        this.reservationId = reservationId;
        this.flightId = flightId;
        this.delayMinutes = delayMinutes;
    }

    public String getReservationId() { return reservationId; }
    public void setReservationId(String reservationId) { this.reservationId = reservationId; }

    public String getFlightId() { return flightId; }
    public void setFlightId(String flightId) { this.flightId = flightId; }

    public int getDelayMinutes() { return delayMinutes; }
    public void setDelayMinutes(int delayMinutes) { this.delayMinutes = delayMinutes; }
}
