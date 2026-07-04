package com.app.dto;

public class ConditionResult {

    private String label;
    private boolean satisfied;

    public ConditionResult() {}

    public ConditionResult(String label, boolean satisfied) {
        this.label = label;
        this.satisfied = satisfied;
    }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public boolean getSatisfied() { return satisfied; }
    public void setSatisfied(boolean satisfied) { this.satisfied = satisfied; }
}
