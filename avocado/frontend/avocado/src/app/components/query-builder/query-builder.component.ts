import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BackwardChainGoal, BackwardChainResult, BackwardChainCondition } from '../../models/backward-chain.model';
import { Flight, DistanceCategory } from '../../models/flight.model';
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
    const distanceKm = Number(this.factsForm.value.distanceKm ?? 2400);
    const isFromEu = this.factsForm.value.isEUDeparture ?? true;
    const isEuCarrier = this.factsForm.value.isEUCarrier ?? true;
    const isWithinEu = distanceKm <= 3500;
    const distanceCategory: DistanceCategory = distanceKm <= 1500
      ? 'SHORT'
      : isWithinEu
        ? 'MEDIUM'
        : 'LONG';

    const flight: Flight = {
      flightId: this.factsForm.value.flightId || 'flight-001',
      operatingCarrier: 'Lufthansa',
      departureAirport: 'BEG',
      arrivalAirport: 'FRA',
      isFromEu,
      isToEu: true,
      isEuCarrier,
      isWithinEu,
      hasConfirmedReservation: true,
      flightDistanceKm: distanceKm,
      distanceCategory,
      isRegulationApplicable: false
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

    console.debug('[QueryBuilder] verifying goal', { goal, flight, passenger, incident });

    this.reasoningService.askQuestion(goal.id, flight, passenger, incident).subscribe({
      next: (response) => {
        console.debug('[QueryBuilder] backend query response', response);
        this.result = {
          goalId: goal.id,
          goalName: goal.name,
          achievable: response.satisfied,
          confidence: response.satisfied ? 0.95 : 0.7,
          conclusion: response.satisfied
            ? `The backend confirmed that ${goal.name.toLowerCase()} is satisfied for the provided facts.`
            : `The backend did not confirm ${goal.name.toLowerCase()} for the provided facts.`,
          articleReference: response.goal || goal.description,
          conditions: [],
          missingFacts: [],
          nextSteps: response.satisfied
            ? 'You can proceed with a complaint or claim.'
            : 'Adjust the facts or submit more evidence and check again.',
          ruleTrace: [`BACKEND: ${response.goal}`]
        };
        this.loading = false;
      },
      error: (error) => {
        console.error('[QueryBuilder] backend query request failed', error);
        this.result = {
          goalId: goal.id,
          goalName: goal.name,
          achievable: false,
          confidence: 0,
          conclusion: `The reasoning service could not verify ${goal.name.toLowerCase()} because the backend request failed.`,
          articleReference: goal.description,
          conditions: [],
          missingFacts: [],
          nextSteps: 'Please ensure the backend is running and try again.',
          ruleTrace: ['BACKEND ERROR']
        };
        this.loading = false;
      }
    });
  }
}