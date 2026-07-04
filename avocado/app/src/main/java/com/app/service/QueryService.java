package com.app.service;

import com.app.Flight;
import com.app.Incident;
import com.app.Passenger;
import com.app.dto.ConditionResult;
import com.app.dto.QuestionResponse;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class QueryService {

    private static final Map<String, String[][]> GOAL_CONDITIONS = new LinkedHashMap<>();

    static {
        GOAL_CONDITIONS.put("compensation250", new String[][]{
                {"Regulation applies (Art. 3)", "regulationApplicable"},
                {"Distance category is SHORT (Art. 7(1)(a))", "distanceIsShort"},
                {"Qualifying incident: delay >= 3h at destination / cancellation / denied boarding", "qualifyingIncident3h"},
                {"No extraordinary circumstance (Art. 5(3))", "notExtraordinary"}});
        GOAL_CONDITIONS.put("compensation400", new String[][]{
                {"Regulation applies (Art. 3)", "regulationApplicable"},
                {"Distance category is MEDIUM (Art. 7(1)(b))", "distanceIsMedium"},
                {"Qualifying incident: delay >= 3h at destination / cancellation / denied boarding", "qualifyingIncident3h"},
                {"No extraordinary circumstance (Art. 5(3))", "notExtraordinary"}});
        GOAL_CONDITIONS.put("compensation600", new String[][]{
                {"Regulation applies (Art. 3)", "regulationApplicable"},
                {"Distance category is LONG (Art. 7(1)(c))", "distanceIsLong"},
                {"Qualifying incident: delay >= 4h at destination / cancellation / denied boarding", "qualifyingIncident4h"},
                {"No extraordinary circumstance (Art. 5(3))", "notExtraordinary"}});
        GOAL_CONDITIONS.put("hotelRight", new String[][]{
                {"Regulation applies (Art. 3)", "regulationApplicable"},
                {"Overnight stay is required (Art. 9(1)(b))", "overnightStayRequired"}});
        GOAL_CONDITIONS.put("ticketRefund", new String[][]{
                {"Regulation applies (Art. 3)", "regulationApplicable"},
                {"Refund trigger: delay >= 5h / cancellation / denied boarding (Art. 8(1)(a))", "refundTrigger"},
                {"Passenger chose refund instead of rerouting", "passengerChoseRefund"}});
        GOAL_CONDITIONS.put("alternativeFlight", new String[][]{
                {"Regulation applies (Art. 3)", "regulationApplicable"},
                {"Trigger: delay >= 5h / cancellation / denied boarding (Art. 8)", "refundTrigger"}});
        GOAL_CONDITIONS.put("downgradeRefund", new String[][]{
                {"Passenger was seated in a lower class (Art. 10)", "passengerDowngraded"}});
        GOAL_CONDITIONS.put("refuseVoucherClaimCash", new String[][]{
                {"Compensation right exists (Art. 7(3))", "compensationRightExists"}});
    }

    private final KieContainer kieContainer;

    @Autowired
    public QueryService(KieContainer kieContainer) {
        this.kieContainer = kieContainer;
    }

    public QuestionResponse ask(Flight flight, Passenger passenger, Incident incident, String goal) {
        KieSession session = kieContainer.newKieSession("ksession-rules");
        session.insert(flight);
        if (passenger != null) {
            session.insert(passenger);
        }
        if (incident != null) {
            session.insert(incident);
        }

        session.getAgenda().getAgendaGroup("level4").setFocus();
        session.getAgenda().getAgendaGroup("level3").setFocus();
        session.getAgenda().getAgendaGroup("level2").setFocus();
        session.getAgenda().getAgendaGroup("level1").setFocus();
        session.fireAllRules();

        String flightId = flight.getFlightId();
        QuestionResponse response = new QuestionResponse(goal,
                session.getQueryResults(goal, flightId).size() > 0);

        String[][] conditions = GOAL_CONDITIONS.get(goal);
        if (conditions != null) {
            for (String[] condition : conditions) {
                boolean satisfied = session.getQueryResults(condition[1], flightId).size() > 0;
                response.getConditions().add(new ConditionResult(condition[0], satisfied));
            }
        }

        session.dispose();
        return response;
    }
}
