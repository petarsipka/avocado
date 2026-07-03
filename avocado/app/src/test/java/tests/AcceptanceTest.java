package tests;

import com.app.Compensation;
import com.app.Flight;
import com.app.Incident;
import com.app.IncidentType;
import com.app.RightType;
import com.app.dto.CepResult;
import com.app.service.CepService;
import com.app.service.FlightSimulation;
import org.junit.jupiter.api.Test;
import org.kie.api.runtime.KieSession;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class AcceptanceTest {

    @Test
    public void anaScenarioForwardChaining() {
        KieSession s = Helper.forwardSession();
        Flight f = new Flight("LH1411", true);
        f.setHasConfirmedReservation(true);
        f.setFlightDistanceKm(2400);
        f.setIsWithinEu(false);
        f.setReservationId("R1");
        Incident i = new Incident();
        i.setFlightId("LH1411");
        i.setType(IncidentType.DELAY);
        i.setDelayHours(3);
        i.setDelayAtDestinationHours(3.5);
        i.setIsRequiresOvernightStay(true);
        s.insert(f);
        s.insert(i);
        Helper.fireForward(s);

        Compensation c = Helper.compensation(s, "Art. 7(1)(b)");
        assertNotNull(c);
        assertEquals(400.0, c.getAmountEur());
        assertTrue(Helper.hasRight(s, RightType.CARE_MEALS));
        assertTrue(Helper.hasRight(s, RightType.HOTEL));
        s.dispose();
    }

    @Test
    public void anaScenarioMissedConnection() {
        CepService cep = new CepService(Helper.container());
        CepResult result = cep.simulate(new FlightSimulation().anaScenario());
        assertFalse(result.getMissedConnections().isEmpty());
    }
}
