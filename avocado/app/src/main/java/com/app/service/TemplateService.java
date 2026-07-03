package com.app.service;

import com.app.Incident;
import com.app.Right;
import com.app.template.ThresholdModel;
import org.drools.template.ObjectDataCompiler;
import org.kie.api.io.ResourceType;
import org.kie.api.runtime.KieSession;
import org.kie.internal.utils.KieHelper;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class TemplateService {

    public List<Right> applyThresholds(List<ThresholdModel> thresholds, Incident incident) {
        InputStream template = getClass().getResourceAsStream("/templates/threshold-rules.drt");
        ObjectDataCompiler compiler = new ObjectDataCompiler();
        String drl = compiler.compile(thresholds, template);

        KieHelper kieHelper = new KieHelper();
        kieHelper.addContent(drl, ResourceType.DRL);
        KieSession session = kieHelper.build().newKieSession();

        session.insert(incident);
        session.fireAllRules();

        List<Right> rights = new ArrayList<>();
        for (Object o : session.getObjects()) {
            if (o instanceof Right) {
                rights.add((Right) o);
            }
        }

        session.dispose();
        return rights;
    }
}
