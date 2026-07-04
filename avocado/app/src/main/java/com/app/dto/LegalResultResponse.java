package com.app.dto;

import com.app.Advice;
import com.app.Compensation;
import com.app.Right;

import java.util.ArrayList;
import java.util.List;

public class LegalResultResponse {

    private boolean regulationApplicable;
    private String distanceCategory;
    private List<Compensation> compensations = new ArrayList<>();
    private List<Right> rights = new ArrayList<>();
    private List<Advice> advice = new ArrayList<>();

    public boolean getRegulationApplicable() { return regulationApplicable; }
    public void setRegulationApplicable(boolean regulationApplicable) { this.regulationApplicable = regulationApplicable; }

    public String getDistanceCategory() { return distanceCategory; }
    public void setDistanceCategory(String distanceCategory) { this.distanceCategory = distanceCategory; }

    public List<Compensation> getCompensations() { return compensations; }
    public void setCompensations(List<Compensation> compensations) { this.compensations = compensations; }

    public List<Right> getRights() { return rights; }
    public void setRights(List<Right> rights) { this.rights = rights; }

    public List<Advice> getAdvice() { return advice; }
    public void setAdvice(List<Advice> advice) { this.advice = advice; }
}
