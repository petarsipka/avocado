package com.app.dto;

import com.app.Incident;
import com.app.template.ThresholdModel;

import java.util.List;

public class ThresholdRequest {

    private List<ThresholdModel> thresholds;
    private Incident incident;

    public List<ThresholdModel> getThresholds() { return thresholds; }
    public void setThresholds(List<ThresholdModel> thresholds) { this.thresholds = thresholds; }

    public Incident getIncident() { return incident; }
    public void setIncident(Incident incident) { this.incident = incident; }
}
