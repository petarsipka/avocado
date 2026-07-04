import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReasoningService } from '../../services/reasoning.service';
import { ScenarioService, Scenario } from '../../services/scenario.service';
import { QuestionResponse } from '../../models/legal.model';
import { Flight } from '../../models/flight.model';
import { Incident, IncidentType, DisruptionCause } from '../../models/incident.model';
import { Passenger, PassengerChoice } from '../../models/passenger.model';

interface Goal {
  id: string;
  name: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.css']
})
export class QueryBuilderComponent implements OnInit {

  goals: Goal[] = [
    { id: 'compensation250', name: 'Compensation €250', description: 'Short distance (Art. 7(1)(a))', icon: 'euro_symbol' },
    { id: 'compensation400', name: 'Compensation €400', description: 'Medium distance (Art. 7(1)(b))', icon: 'euro_symbol' },
    { id: 'compensation600', name: 'Compensation €600', description: 'Long distance (Art. 7(1)(c))', icon: 'euro_symbol' },
    { id: 'hotelRight', name: 'Hotel Accommodation', description: 'Overnight stay required (Art. 9(1)(b))', icon: 'hotel' },
    { id: 'ticketRefund', name: 'Ticket Refund', description: 'Delay 5h+ / cancellation / denied boarding + refund chosen (Art. 8(1)(a))', icon: 'currency_exchange' },
    { id: 'alternativeFlight', name: 'Alternative Flight', description: 'Rerouting without surcharge (Art. 8)', icon: 'flight' },
    { id: 'downgradeRefund', name: 'Downgrade Refund', description: '30/50/75% of ticket price (Art. 10)', icon: 'airline_seat_recline_normal' },
    { id: 'refuseVoucherClaimCash', name: 'Reject Voucher', description: 'Cash instead of voucher (Art. 7(3))', icon: 'payments' }
  ];

  scenarios: Scenario[];
  selectedScenarioId = 'ana';
  selectedGoal?: Goal;
  result?: QuestionResponse;
  error = '';
  loading = false;

  factsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private reasoningService: ReasoningService,
    public scenarioService: ScenarioService
  ) {
    this.scenarios = this.scenarioService.scenarios;
    this.factsForm = this.fb.group({
      flightDistanceKm: [2400],
      isWithinEu: [false],
      type: ['DELAY'],
      delayHours: [0],
      delayAtDestinationHours: [0],
      noticeDaysBefore: [0],
      cause: ['NONE'],
      isRequiresOvernightStay: [false],
      isDowngraded: [false],
      choice: ['NONE']
    });
  }

  ngOnInit() {
    const scenarioId = this.route.snapshot.queryParamMap.get('scenario');
    if (scenarioId && this.scenarioService.byId(scenarioId)) {
      this.selectedScenarioId = scenarioId;
    }
    this.loadScenarioFacts(this.selectedScenarioId);
  }

  get scenario(): Scenario {
    return this.scenarioService.byId(this.selectedScenarioId)!;
  }

  loadScenarioFacts(id: string) {
    this.selectedScenarioId = id;
    const s = this.scenarioService.byId(id);
    if (!s) return;
    this.factsForm.patchValue({
      flightDistanceKm: s.flight.flightDistanceKm,
      isWithinEu: s.flight.isWithinEu,
      type: s.incident.type,
      delayHours: s.incident.delayHours,
      delayAtDestinationHours: s.incident.delayAtDestinationHours,
      noticeDaysBefore: s.incident.noticeDaysBefore,
      cause: s.incident.cause,
      isRequiresOvernightStay: s.incident.isRequiresOvernightStay,
      isDowngraded: s.incident.isDowngraded,
      choice: s.passenger.choice
    });
    this.result = undefined;
  }

  selectGoal(goal: Goal) {
    this.selectedGoal = goal;
    this.result = undefined;
    this.error = '';
  }

  verifyGoal() {
    if (!this.selectedGoal) return;
    const s = this.scenario;
    const v = this.factsForm.value;

    const flight: Flight = {
      ...s.flight,
      flightDistanceKm: Number(v.flightDistanceKm),
      isWithinEu: v.isWithinEu,
      distanceCategory: null,
      isRegulationApplicable: false
    };

    const passenger: Passenger = {
      ...s.passenger,
      choice: v.choice as PassengerChoice
    };

    const incident: Incident = {
      ...s.incident,
      type: v.type as IncidentType,
      delayHours: Number(v.delayHours),
      delayAtDestinationHours: Number(v.delayAtDestinationHours),
      noticeDaysBefore: Number(v.noticeDaysBefore),
      cause: v.cause as DisruptionCause,
      isRequiresOvernightStay: v.isRequiresOvernightStay,
      isDowngraded: v.isDowngraded,
      isExtraordinary: false
    };

    this.loading = true;
    this.error = '';

    this.reasoningService.askQuestion(this.selectedGoal.id, flight, passenger, incident).subscribe({
      next: (response) => {
        this.result = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Backend request failed. Is the backend running on port 8080?';
        this.loading = false;
        console.error('[QueryBuilder] request failed', err);
      }
    });
  }
}
