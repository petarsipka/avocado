package tests;

import com.app.DistanceCategory;
import com.app.Flight;
import com.app.FlightStatus;
import com.app.FlightStatusEvent;
import com.app.dto.CepResult;
import com.app.dto.SimulationData;
import com.app.service.CepService;
import com.app.service.FlightSimulation;
import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class CepTest {

    @Test
    public void missedConnectionDetected() {
        CepService cep = new CepService(Helper.container());
        FlightSimulation simulation = new FlightSimulation();
        CepResult result = cep.simulate(simulation.anaScenario());
        assertFalse(result.getMissedConnections().isEmpty());
    }

    @Test
    public void cumulativeDelayAcrossSegmentsReachesThreshold() {
        Flight first = new Flight("XX100", true);
        first.setReservationId("R9");
        first.setDistanceCategory(DistanceCategory.MEDIUM);
        Flight second = new Flight("XX200", true);
        second.setReservationId("R9");
        second.setDistanceCategory(DistanceCategory.MEDIUM);

        SimulationData data = new SimulationData(
                Arrays.asList(first, second),
                Arrays.asList(
                        new FlightStatusEvent("XX100", FlightStatus.DELAYED, 60_000L, 120, "R9"),
                        new FlightStatusEvent("XX200", FlightStatus.DELAYED, 120_000L, 90, "R9")));

        CepService cep = new CepService(Helper.container());
        CepResult result = cep.simulate(data);

        assertTrue(result.getNotifications().stream()
                .anyMatch(n -> n.getArticle().contains("cumulative")));
    }

    @Test
    public void delayEscalationRaisesNotification() {
        CepService cep = new CepService(Helper.container());
        FlightSimulation simulation = new FlightSimulation();
        CepResult result = cep.simulate(simulation.delayScenario("JU380", DistanceCategory.SHORT, 130));
        assertFalse(result.getNotifications().isEmpty());
    }
}
