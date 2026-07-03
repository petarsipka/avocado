package com.app;

import java.io.Serializable;

public class MissedConnection implements Serializable {

    private String reservationId;
    private String landedFlightId;
    private String departedFlightId;

    public MissedConnection() {}

    public MissedConnection(String reservationId, String landedFlightId, String departedFlightId) {
        this.reservationId = reservationId;
        this.landedFlightId = landedFlightId;
        this.departedFlightId = departedFlightId;
    }

    public String getReservationId() { return reservationId; }
    public void setReservationId(String reservationId) { this.reservationId = reservationId; }

    public String getLandedFlightId() { return landedFlightId; }
    public void setLandedFlightId(String landedFlightId) { this.landedFlightId = landedFlightId; }

    public String getDepartedFlightId() { return departedFlightId; }
    public void setDepartedFlightId(String departedFlightId) { this.departedFlightId = departedFlightId; }
}
