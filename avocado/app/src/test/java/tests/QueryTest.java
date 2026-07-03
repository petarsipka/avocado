package tests;

import com.app.Flight;
import com.app.Incident;
import com.app.IncidentType;
import org.junit.jupiter.api.Test;
import org.kie.api.runtime.KieSession;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class QueryTest {

    @Test
    public void compensation400QueryMatchesMediumDelay() {
        KieSession s = Helper.forwardSession();
        Flight f = new Flight("F1", true);
        f.setHasConfirmedReservation(true);
        f.setFlightDistanceKm(2400);
        f.setIsWithinEu(false);
        Incident i = new Incident();
        i.setFlightId("F1");
        i.setType(IncidentType.DELAY);
        i.setDelayAtDestinationHours(3);
        s.insert(f);
        s.insert(i);
        Helper.fireForward(s);
        assertTrue(s.getQueryResults("compensation400", "F1").size() > 0);
        s.dispose();
    }

    @Test
    public void downgradeRefundQueryMatches() {
        KieSession s = Helper.forwardSession();
        Flight f = new Flight("F1", true);
        f.setHasConfirmedReservation(true);
        f.setFlightDistanceKm(1000);
        f.setIsWithinEu(true);
        Incident i = new Incident();
        i.setFlightId("F1");
        i.setType(IncidentType.DELAY);
        i.setIsDowngraded(true);
        s.insert(f);
        s.insert(i);
        Helper.fireForward(s);
        assertEquals(1, s.getQueryResults("downgradeRefund", "F1").size());
        s.dispose();
    }
}
