package com.app;

import java.io.Serializable;

public class Flight implements Serializable {
    private String flightId;
    private boolean isFromEu;
    private boolean isRegulationApplicable;

    public Flight() {}

    public Flight(String flightId, boolean isFromEu) {
        this.flightId = flightId;
        this.isFromEu = isFromEu;
        this.isRegulationApplicable = false;
    }

    public String getFlightId() { return flightId; }
    public void setFlightId(String flightId) { this.flightId = flightId; }
    public boolean getIsFromEu() { return isFromEu; }
    public void setIsFromEu(boolean isFromEu) { this.isFromEu = isFromEu; }
    public boolean getIsRegulationApplicable() { return isRegulationApplicable; }
    public void setIsRegulationApplicable(boolean isRegulationApplicable) { this.isRegulationApplicable = isRegulationApplicable; }

}
