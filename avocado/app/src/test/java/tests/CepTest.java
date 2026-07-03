package tests;

import com.app.DistanceCategory;
import com.app.dto.CepResult;
import com.app.service.CepService;
import com.app.service.FlightSimulation;
import org.junit.jupiter.api.Test;

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
    public void delayEscalationRaisesNotification() {
        CepService cep = new CepService(Helper.container());
        FlightSimulation simulation = new FlightSimulation();
        CepResult result = cep.simulate(simulation.delayScenario("JU380", DistanceCategory.SHORT, 130));
        assertFalse(result.getNotifications().isEmpty());
    }
}
