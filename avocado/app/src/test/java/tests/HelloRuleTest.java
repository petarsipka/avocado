package tests;

import com.app.Flight;
import org.junit.Test;
import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class HelloRuleTest {
    @Test
    public void regulationApplicableEuFlight() {
        KieServices ks = KieServices.Factory.get();
        KieContainer kc = ks.getKieClasspathContainer();
        KieSession session = kc.newKieSession("ksession-rules");

        Flight flight = new Flight("JU380", true);
        session.insert(flight);
        int fired = session.fireAllRules();
        session.dispose();

        assertEquals(1, fired);
        assertTrue(flight.getIsRegulationApplicable());

        System.out.println("Result" + flight.getIsRegulationApplicable());
    }
}
