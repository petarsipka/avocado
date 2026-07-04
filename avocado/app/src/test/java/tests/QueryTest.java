package tests;

import com.app.Flight;
import com.app.Incident;
import com.app.IncidentType;
import com.app.dto.QuestionResponse;
import com.app.service.QueryService;
import org.junit.jupiter.api.Test;
import org.kie.api.runtime.KieSession;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
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
    public void questionResponseListsConditionBreakdown() {
        Flight f = new Flight("F1", true);
        f.setHasConfirmedReservation(true);
        f.setFlightDistanceKm(2400);
        f.setIsWithinEu(false);
        Incident i = new Incident();
        i.setFlightId("F1");
        i.setType(IncidentType.DELAY);
        i.setDelayAtDestinationHours(3);

        QueryService service = new QueryService(Helper.container());
        QuestionResponse response = service.ask(f, null, i, "compensation600");

        assertFalse(response.getSatisfied());
        assertEquals(4, response.getConditions().size());
        assertTrue(response.getConditions().get(0).getSatisfied());
        assertFalse(response.getConditions().get(1).getSatisfied());
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
