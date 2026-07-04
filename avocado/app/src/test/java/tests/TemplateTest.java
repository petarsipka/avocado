package tests;

import com.app.Incident;
import com.app.Right;
import com.app.template.ThresholdModel;
import com.app.service.TemplateService;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;

public class TemplateTest {

    @Test
    public void customThresholdProducesRight() {
        List<ThresholdModel> thresholds = new ArrayList<>();
        thresholds.add(new ThresholdModel(2, "Custom Art. X", "Care above custom threshold"));

        Incident incident = new Incident();
        incident.setDelayHours(3);

        List<Right> rights = new TemplateService().applyThresholds(thresholds, incident);
        assertFalse(rights.isEmpty());
    }
}
