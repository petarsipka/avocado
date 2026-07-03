package com.app.dto;

public class QuestionResponse {

    private String goal;
    private boolean satisfied;

    public QuestionResponse() {}

    public QuestionResponse(String goal, boolean satisfied) {
        this.goal = goal;
        this.satisfied = satisfied;
    }

    public String getGoal() { return goal; }
    public void setGoal(String goal) { this.goal = goal; }

    public boolean getSatisfied() { return satisfied; }
    public void setSatisfied(boolean satisfied) { this.satisfied = satisfied; }
}
