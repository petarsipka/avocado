package com.app;

import java.io.Serializable;

public class Flight implements Serializable {

    private String flightId;
    private String date;
    private String departureAirport;
    private String arrivalAirport;
    private String operatingCarrier;

    private boolean isFromEu;
    private boolean isToEu;
    private boolean isEuCarrier;
    private boolean isWithinEu;
    private boolean hasConfirmedReservation;

    private double flightDistanceKm;
    private DistanceCategory distanceCategory;

    private String reservationId;

    private boolean isRegulationApplicable;

    public Flight() {}

    public Flight(String flightId, boolean isFromEu) {
        this.flightId = flightId;
        this.isFromEu = isFromEu;
        this.isRegulationApplicable = false;
    }

    public String getFlightId() { return flightId; }
    public void setFlightId(String flightId) { this.flightId = flightId; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getDepartureAirport() { return departureAirport; }
    public void setDepartureAirport(String departureAirport) { this.departureAirport = departureAirport; }

    public String getArrivalAirport() { return arrivalAirport; }
    public void setArrivalAirport(String arrivalAirport) { this.arrivalAirport = arrivalAirport; }

    public String getOperatingCarrier() { return operatingCarrier; }
    public void setOperatingCarrier(String operatingCarrier) { this.operatingCarrier = operatingCarrier; }

    public boolean getIsFromEu() { return isFromEu; }
    public void setIsFromEu(boolean isFromEu) { this.isFromEu = isFromEu; }

    public boolean getIsToEu() { return isToEu; }
    public void setIsToEu(boolean isToEu) { this.isToEu = isToEu; }

    public boolean getIsEuCarrier() { return isEuCarrier; }
    public void setIsEuCarrier(boolean isEuCarrier) { this.isEuCarrier = isEuCarrier; }

    public boolean getIsWithinEu() { return isWithinEu; }
    public void setIsWithinEu(boolean isWithinEu) { this.isWithinEu = isWithinEu; }

    public boolean getHasConfirmedReservation() { return hasConfirmedReservation; }
    public void setHasConfirmedReservation(boolean hasConfirmedReservation) { this.hasConfirmedReservation = hasConfirmedReservation; }

    public double getFlightDistanceKm() { return flightDistanceKm; }
    public void setFlightDistanceKm(double flightDistanceKm) { this.flightDistanceKm = flightDistanceKm; }

    public DistanceCategory getDistanceCategory() { return distanceCategory; }
    public void setDistanceCategory(DistanceCategory distanceCategory) { this.distanceCategory = distanceCategory; }

    public String getReservationId() { return reservationId; }
    public void setReservationId(String reservationId) { this.reservationId = reservationId; }

    public boolean getIsRegulationApplicable() { return isRegulationApplicable; }
    public void setIsRegulationApplicable(boolean isRegulationApplicable) { this.isRegulationApplicable = isRegulationApplicable; }
}
