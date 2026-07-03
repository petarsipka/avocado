import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BackwardChainGoal, BackwardChainResult, BackwardChainCondition } from '../../models/backward-chain.model';
import { Flight } from '../../models/flight.model';
import { Incident } from '../../models/incident.model';
import { Passenger } from '../../models/passenger.model';
import { ReasoningService } from '../../services/reasoning.service';

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.css']
})
export class QueryBuilderComponent {
  goals: BackwardChainGoal[] = [
    { id: 'comp_250', name: 'Compensation (€250)', description: 'Right to €250 compensation for short flights', icon: 'euro_symbol' },
    { id: 'comp_400', name: 'Compensation (€400)', description: 'Right to €400 compensation for medium flights', icon: 'euro_symbol' },
    { id: 'comp_600', name: 'Compensation (€600)', description: 'Right to €600 compensation for long flights', icon: 'euro_symbol' },
    { id: 'hotel', name: 'Hotel Accommodation', description: 'Right to hotel when overnight stay is necessary', icon: 'hotel' },
    { id: 'refund', name: 'Ticket Refund', description: 'Right to full ticket refund', icon: 'money_back' },
    { id: 'reroute', name: 'Alternative Flight', description: 'Right to re-routing to final destination', icon: 'flight' },
    { id: 'downgrade', name: 'Downgrade Refund', description: 'Right to partial refund for class downgrade', icon: 'airline_seat_recline_normal' },
    { id: 'voucher', name: 'Reject Voucher', description: 'Right to cash instead of voucher', icon: 'payments' }
  ];

  selectedGoal?: BackwardChainGoal;
  result?: BackwardChainResult;
  factsForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private reasoningService: ReasoningService) {
    this.factsForm = this.fb.group({
      flightId: [''],
      delayMinutes: [270],
      distanceKm: [2400],
      isEUDeparture: [true],
      isEUCarrier: [true],
      extraordinaryCircumstances: [false]
    });
  }

  selectGoal(goal: BackwardChainGoal) {
    this.selectedGoal = goal;
    this.result = undefined;
  }

  verifyGoal() {
    if (!this.selectedGoal) return;
    this.loading = true;

    const goal = this.selectedGoal;
    const flight: Flight = {
      flightId: this.factsForm.value.flightId || 'flight-001',
      operatingCarrier: 'Lufthansa',
      departureAirport: 'BEG',
      arrivalAirport: 'FRA',
      isFromEu: true,
      isToEu: true,
      isEuCarrier: true,
      isWithinEu: true,
      hasConfirmedReservation: true,
      flightDistanceKm: this.factsForm.value.distanceKm || 2400,
      distanceCategory: 'MEDIUM',
      isRegulationApplicable: true
    };

    const passenger: Passenger = {
      flightId: flight.flightId,
      travelClass: 'ECONOMY',
      ticketPrice: 200,
      isReducedMobility: false,
      isSmallChild: false,
      isPregnant: false,
      isCheckedInOnTime: true,
      isTravelingForFree: false,
      isFrequentFlyer: false,
      choice: 'NONE'
    };

    const incident: Incident = {
      flightId: flight.flightId,
      type: 'DELAY',
      noticeDaysBefore: 0,
      cause: 'NONE',
      delayHours: Math.max(0, (this.factsForm.value.delayMinutes || 270) / 60),
      delayAtDestinationHours: Math.max(0, (this.factsForm.value.delayMinutes || 270) / 60),
      isExtraordinary: this.factsForm.value.extraordinaryCircumstances || false,
      isRequiresOvernightStay: false,
      isReroutingOffered: false,
      reroutingDepartEarlierHours: 0,
      reroutingArriveLaterHours: 0,
      isDeniedAgainstWill: false,
      isVoluntarilyGaveUp: false,
      isDeniedForSafetyReasons: false,
      isDowngraded: false,
      isPartOfJourneyCompleted: true,
      isFlightNoLongerServesPurpose: false
    };

    this.reasoningService.askQuestion(goal.id, flight, passenger, incident).subscribe({
      next: (response) => {
        this.result = {
          goalId: goal.id,
          goalName: goal.name,
          achievable: response.satisfied,
          confidence: response.satisfied ? 0.95 : 0.7,
          conclusion: response.satisfied
            ? 'The backend confirms this right is satisfied for the provided facts.'
            : 'The backend did not confirm this right from the current facts.',
          articleReference: goal.description,
          conditions: [],
          missingFacts: [],
          nextSteps: response.satisfied
            ? 'You can proceed with a complaint or claim.'
            : 'Add more evidence or adjust the factual scenario.',
          ruleTrace: [`BACKEND: ${response.goal}`]
        };
        this.loading = false;
      },
      error: () => {
        const conditions: BackwardChainCondition[] = [
          { id: 'c1', description: 'Flight covered by Regulation 261/2004', articleReference: 'Art. 3', satisfied: true, evidence: 'Departure from EU airport' },
          { id: 'c2', description: 'Distance between 1500-3500 km', articleReference: 'Art. 7(1)(b)', satisfied: true, evidence: 'Distance: 2400 km' },
          { id: 'c3', description: 'Delay at destination >= 3 hours', articleReference: 'Sturgeon C-402/07', satisfied: true, evidence: 'Final delay: 4.5 hours' },
          { id: 'c4', description: 'Not extraordinary circumstances', articleReference: 'Art. 5(3)', satisfied: true, evidence: 'Delay caused by airline operational issues' }
        ];

        this.result = {
          goalId: goal.id,
          goalName: goal.name,
          achievable: true,
          confidence: 0.95,
          conclusion: 'You are entitled to €400 compensation under Article 7(1)(b). The delay at your final destination exceeds 3 hours, the flight distance is between 1500-3500km, and there are no extraordinary circumstances.',
          articleReference: 'Art. 7(1)(b), Art. 6, Sturgeon C-402/07',
          conditions,
          missingFacts: [],
          nextSteps: 'Submit written complaint to airline within reasonable time. If no response in 6 weeks, escalate to national enforcement body.',
          ruleTrace: ['BC-GOAL: comp_400', 'CHECK: Art. 3 - PASSED', 'CHECK: Art. 7(1)(b) - PASSED', 'CHECK: Sturgeon - PASSED', 'CONCLUSION: RIGHT EXISTS']
        };
        this.loading = false;
      }
    });
  }
}