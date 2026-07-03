package com.app;

import java.io.Serializable;

public class Passenger implements Serializable {

    private String flightId;
    private TravelClass travelClass;
    private double ticketPrice;
    private boolean isReducedMobility;
    private boolean isSmallChild;
    private boolean isPregnant;
    private boolean isCheckedInOnTime;
    private boolean isTravelingForFree;
    private boolean isFrequentFlyer;
    private PassengerChoice choice;

    public Passenger() {
        this.choice = PassengerChoice.NONE;
    }

    public String getFlightId() { return flightId; }
    public void setFlightId(String flightId) { this.flightId = flightId; }

    public TravelClass getTravelClass() { return travelClass; }
    public void setTravelClass(TravelClass travelClass) { this.travelClass = travelClass; }

    public double getTicketPrice() { return ticketPrice; }
    public void setTicketPrice(double ticketPrice) { this.ticketPrice = ticketPrice; }

    public boolean getIsReducedMobility() { return isReducedMobility; }
    public void setIsReducedMobility(boolean isReducedMobility) { this.isReducedMobility = isReducedMobility; }

    public boolean getIsSmallChild() { return isSmallChild; }
    public void setIsSmallChild(boolean isSmallChild) { this.isSmallChild = isSmallChild; }

    public boolean getIsPregnant() { return isPregnant; }
    public void setIsPregnant(boolean isPregnant) { this.isPregnant = isPregnant; }

    public boolean getIsCheckedInOnTime() { return isCheckedInOnTime; }
    public void setIsCheckedInOnTime(boolean isCheckedInOnTime) { this.isCheckedInOnTime = isCheckedInOnTime; }

    public boolean getIsTravelingForFree() { return isTravelingForFree; }
    public void setIsTravelingForFree(boolean isTravelingForFree) { this.isTravelingForFree = isTravelingForFree; }

    public boolean getIsFrequentFlyer() { return isFrequentFlyer; }
    public void setIsFrequentFlyer(boolean isFrequentFlyer) { this.isFrequentFlyer = isFrequentFlyer; }

    public PassengerChoice getChoice() { return choice; }
    public void setChoice(PassengerChoice choice) { this.choice = choice; }
}
