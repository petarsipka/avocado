package tests;

import com.app.Compensation;
import com.app.DisruptionCause;
import com.app.DistanceCategory;
import com.app.Flight;
import com.app.Incident;
import com.app.IncidentType;
import com.app.Passenger;
import com.app.RightType;
import org.junit.jupiter.api.Test;
import org.kie.api.runtime.KieSession;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class ForwardRulesTest {

    private Flight applicableFlight(String id, double km, boolean withinEu) {
        Flight f = new Flight(id, true);
        f.setHasConfirmedReservation(true);
        f.setFlightDistanceKm(km);
        f.setIsWithinEu(withinEu);
        return f;
    }

    @Test
    public void scopeAppliesForEuDeparture() {
        KieSession s = Helper.forwardSession();
        Flight f = applicableFlight("F1", 1000, true);
        s.insert(f);
        Helper.fireForward(s);
        assertTrue(f.getIsRegulationApplicable());
        s.dispose();
    }

    @Test
    public void distanceCategoryMedium() {
        KieSession s = Helper.forwardSession();
        Flight f = applicableFlight("F1", 2400, false);
        s.insert(f);
        Helper.fireForward(s);
        assertEquals(DistanceCategory.MEDIUM, f.getDistanceCategory());
        s.dispose();
    }

    @Test
    public void cancellationLateNoticeGivesCompensation() {
        KieSession s = Helper.forwardSession();
        Flight f = applicableFlight("F1", 1000, true);
        Incident i = new Incident();
        i.setFlightId("F1");
        i.setType(IncidentType.CANCELLATION);
        i.setNoticeDaysBefore(3);
        s.insert(f);
        s.insert(i);
        Helper.fireForward(s);
        assertTrue(Helper.hasRight(s, RightType.COMPENSATION));
        assertNotNull(Helper.compensation(s, "Art. 7(1)(a)"));
        s.dispose();
    }

    @Test
    public void cancellationEarlyNoticeNoCompensation() {
        KieSession s = Helper.forwardSession();
        Flight f = applicableFlight("F1", 1000, true);
        Incident i = new Incident();
        i.setFlightId("F1");
        i.setType(IncidentType.CANCELLATION);
        i.setNoticeDaysBefore(20);
        s.insert(f);
        s.insert(i);
        Helper.fireForward(s);
        assertFalse(Helper.hasRight(s, RightType.COMPENSATION));
        s.dispose();
    }

    @Test
    public void delayAtDestinationOverThreeHoursGivesCompensation() {
        KieSession s = Helper.forwardSession();
        Flight f = applicableFlight("F1", 2400, false);
        Incident i = new Incident();
        i.setFlightId("F1");
        i.setType(IncidentType.DELAY);
        i.setDelayAtDestinationHours(3.5);
        s.insert(f);
        s.insert(i);
        Helper.fireForward(s);
        Compensation c = Helper.compensation(s, "Art. 7(1)(b)");
        assertNotNull(c);
        assertEquals(400.0, c.getAmountEur());
        s.dispose();
    }

    @Test
    public void extraordinaryCircumstanceBlocksCompensation() {
        KieSession s = Helper.forwardSession();
        Flight f = applicableFlight("F1", 2400, false);
        Incident i = new Incident();
        i.setFlightId("F1");
        i.setType(IncidentType.DELAY);
        i.setDelayAtDestinationHours(4);
        i.setCause(DisruptionCause.WEATHER);
        s.insert(f);
        s.insert(i);
        Helper.fireForward(s);
        assertFalse(Helper.hasRight(s, RightType.COMPENSATION));
        s.dispose();
    }

    @Test
    public void deniedBoardingGivesCompensation() {
        KieSession s = Helper.forwardSession();
        Flight f = applicableFlight("F1", 1000, true);
        Passenger p = new Passenger();
        p.setFlightId("F1");
        p.setIsCheckedInOnTime(true);
        Incident i = new Incident();
        i.setFlightId("F1");
        i.setType(IncidentType.DENIED_BOARDING);
        i.setIsDeniedAgainstWill(true);
        s.insert(f);
        s.insert(p);
        s.insert(i);
        Helper.fireForward(s);
        assertTrue(Helper.hasRight(s, RightType.COMPENSATION));
        assertNotNull(Helper.compensation(s, "Art. 7(1)(a)"));
        s.dispose();
    }

    @Test
    public void careMealsTriggerPhoneCall() {
        KieSession s = Helper.forwardSession();
        Flight f = applicableFlight("F1", 1000, true);
        Incident i = new Incident();
        i.setFlightId("F1");
        i.setType(IncidentType.DELAY);
        i.setDelayHours(2);
        s.insert(f);
        s.insert(i);
        Helper.fireForward(s);
        assertTrue(Helper.hasRight(s, RightType.CARE_MEALS));
        assertTrue(Helper.hasRight(s, RightType.CARE_PHONE));
        s.dispose();
    }

    @Test
    public void downgradeMediumRefundsFiftyPercent() {
        KieSession s = Helper.forwardSession();
        Flight f = applicableFlight("F1", 2400, false);
        Passenger p = new Passenger();
        p.setFlightId("F1");
        p.setTicketPrice(300);
        Incident i = new Incident();
        i.setFlightId("F1");
        i.setType(IncidentType.DELAY);
        i.setIsDowngraded(true);
        s.insert(f);
        s.insert(p);
        s.insert(i);
        Helper.fireForward(s);
        Compensation c = Helper.compensation(s, "Art. 10(2)(b)");
        assertNotNull(c);
        assertEquals(150.0, c.getAmountEur());
        s.dispose();
    }
}
