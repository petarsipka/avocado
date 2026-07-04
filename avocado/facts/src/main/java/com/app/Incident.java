package com.app;

import java.io.Serializable;

public class Incident implements Serializable {

    private String flightId;
    private IncidentType type;
    private int noticeDaysBefore;
    private DisruptionCause cause;
    private double delayHours;
    private double delayAtDestinationHours;
    private boolean isExtraordinary;
    private boolean isRequiresOvernightStay;
    private boolean isReroutingOffered;
    private double reroutingDepartEarlierHours;
    private double reroutingArriveLaterHours;
    private boolean isDeniedAgainstWill;
    private boolean isVoluntarilyGaveUp;
    private boolean isDeniedForSafetyReasons;
    private boolean isDowngraded;
    private boolean isPartOfJourneyCompleted;
    private boolean isFlightNoLongerServesPurpose;

    public Incident() {
        this.cause = DisruptionCause.NONE;
    }

    public String getFlightId() { return flightId; }
    public void setFlightId(String flightId) { this.flightId = flightId; }

    public IncidentType getType() { return type; }
    public void setType(IncidentType type) { this.type = type; }

    public int getNoticeDaysBefore() { return noticeDaysBefore; }
    public void setNoticeDaysBefore(int noticeDaysBefore) { this.noticeDaysBefore = noticeDaysBefore; }

    public DisruptionCause getCause() { return cause; }
    public void setCause(DisruptionCause cause) { this.cause = cause; }

    public double getDelayHours() { return delayHours; }
    public void setDelayHours(double delayHours) { this.delayHours = delayHours; }

    public double getDelayAtDestinationHours() { return delayAtDestinationHours; }
    public void setDelayAtDestinationHours(double delayAtDestinationHours) { this.delayAtDestinationHours = delayAtDestinationHours; }

    public boolean getIsExtraordinary() { return isExtraordinary; }
    public void setIsExtraordinary(boolean isExtraordinary) { this.isExtraordinary = isExtraordinary; }

    public boolean getIsRequiresOvernightStay() { return isRequiresOvernightStay; }
    public void setIsRequiresOvernightStay(boolean isRequiresOvernightStay) { this.isRequiresOvernightStay = isRequiresOvernightStay; }

    public boolean getIsReroutingOffered() { return isReroutingOffered; }
    public void setIsReroutingOffered(boolean isReroutingOffered) { this.isReroutingOffered = isReroutingOffered; }

    public double getReroutingDepartEarlierHours() { return reroutingDepartEarlierHours; }
    public void setReroutingDepartEarlierHours(double reroutingDepartEarlierHours) { this.reroutingDepartEarlierHours = reroutingDepartEarlierHours; }

    public double getReroutingArriveLaterHours() { return reroutingArriveLaterHours; }
    public void setReroutingArriveLaterHours(double reroutingArriveLaterHours) { this.reroutingArriveLaterHours = reroutingArriveLaterHours; }

    public boolean getIsDeniedAgainstWill() { return isDeniedAgainstWill; }
    public void setIsDeniedAgainstWill(boolean isDeniedAgainstWill) { this.isDeniedAgainstWill = isDeniedAgainstWill; }

    public boolean getIsVoluntarilyGaveUp() { return isVoluntarilyGaveUp; }
    public void setIsVoluntarilyGaveUp(boolean isVoluntarilyGaveUp) { this.isVoluntarilyGaveUp = isVoluntarilyGaveUp; }

    public boolean getIsDeniedForSafetyReasons() { return isDeniedForSafetyReasons; }
    public void setIsDeniedForSafetyReasons(boolean isDeniedForSafetyReasons) { this.isDeniedForSafetyReasons = isDeniedForSafetyReasons; }

    public boolean getIsDowngraded() { return isDowngraded; }
    public void setIsDowngraded(boolean isDowngraded) { this.isDowngraded = isDowngraded; }

    public boolean getIsPartOfJourneyCompleted() { return isPartOfJourneyCompleted; }
    public void setIsPartOfJourneyCompleted(boolean isPartOfJourneyCompleted) { this.isPartOfJourneyCompleted = isPartOfJourneyCompleted; }

    public boolean getIsFlightNoLongerServesPurpose() { return isFlightNoLongerServesPurpose; }
    public void setIsFlightNoLongerServesPurpose(boolean isFlightNoLongerServesPurpose) { this.isFlightNoLongerServesPurpose = isFlightNoLongerServesPurpose; }
}
