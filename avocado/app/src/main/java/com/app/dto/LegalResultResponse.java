package com.app.dto;

import com.app.Advice;
import com.app.Compensation;
import com.app.Right;

import java.util.ArrayList;
import java.util.List;

public class LegalResultResponse {

    private List<Compensation> compensations = new ArrayList<>();
    private List<Right> rights = new ArrayList<>();
    private List<Advice> advice = new ArrayList<>();

    public List<Compensation> getCompensations() { return compensations; }
    public void setCompensations(List<Compensation> compensations) { this.compensations = compensations; }

    public List<Right> getRights() { return rights; }
    public void setRights(List<Right> rights) { this.rights = rights; }

    public List<Advice> getAdvice() { return advice; }
    public void setAdvice(List<Advice> advice) { this.advice = advice; }
}
