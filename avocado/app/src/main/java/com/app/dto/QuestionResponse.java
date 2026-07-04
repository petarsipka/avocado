package com.app.dto;

import java.util.ArrayList;
import java.util.List;

public class QuestionResponse {

    private String goal;
    private boolean satisfied;
    private List<ConditionResult> conditions = new ArrayList<>();

    public QuestionResponse() {}

    public QuestionResponse(String goal, boolean satisfied) {
        this.goal = goal;
        this.satisfied = satisfied;
    }

    public String getGoal() { return goal; }
    public void setGoal(String goal) { this.goal = goal; }

    public boolean getSatisfied() { return satisfied; }
    public void setSatisfied(boolean satisfied) { this.satisfied = satisfied; }

    public List<ConditionResult> getConditions() { return conditions; }
    public void setConditions(List<ConditionResult> conditions) { this.conditions = conditions; }
}
