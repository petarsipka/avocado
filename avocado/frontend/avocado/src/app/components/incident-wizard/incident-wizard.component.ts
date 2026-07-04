import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from '../../models/flight.model';
import { Incident, IncidentType, DisruptionCause } from '../../models/incident.model';
import { Passenger, TravelClass, PassengerChoice } from '../../models/passenger.model';
import { ReasoningService } from '../../services/reasoning.service';
import { ScenarioService, Scenario } from '../../services/scenario.service';

@Component({
  selector: 'app-incident-wizard',
  templateUrl: './incident-wizard.component.html',
  styleUrls: ['./incident-wizard.component.css']
})
export class IncidentWizardComponent implements OnInit {
  scenarios: Scenario[];
  selectedScenarioId = '';
  loading = false;
  error = '';

  flightForm: FormGroup;
  passengerForm: FormGroup;
  incidentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private reasoningService: ReasoningService,
    public scenarioService: ScenarioService
  ) {
    this.scenarios = this.scenarioService.scenarios;

    this.flightForm = this.fb.group({
      flightId: ['', Validators.required],
      departureAirport: [''],
      arrivalAirport: [''],
      operatingCarrier: [''],
      flightDistanceKm: [1000, [Validators.required, Validators.min(1)]],
      isFromEu: [true],
      isToEu: [true],
      isEuCarrier: [true],
      isWithinEu: [true],
      hasConfirmedReservation: [true]
    });

    this.passengerForm = this.fb.group({
      travelClass: ['ECONOMY'],
      ticketPrice: [250, Validators.min(0)],
      choice: ['NONE'],
      isCheckedInOnTime: [true],
      isReducedMobility: [false],
      isSmallChild: [false],
      isPregnant: [false],
      isTravelingForFree: [false],
      isFrequentFlyer: [false]
    });

    this.incidentForm = this.fb.group({
      type: ['DELAY', Validators.required],
      cause: ['NONE'],
      delayHours: [0],
      delayAtDestinationHours: [0],
      isRequiresOvernightStay: [false],
      noticeDaysBefore: [0],
      isReroutingOffered: [false],
      reroutingDepartEarlierHours: [0],
      reroutingArriveLaterHours: [0],
      isDeniedAgainstWill: [false],
      isVoluntarilyGaveUp: [false],
      isDeniedForSafetyReasons: [false],
      isDowngraded: [false],
      isPartOfJourneyCompleted: [false],
      isFlightNoLongerServesPurpose: [false]
    });
  }

  ngOnInit() {
    const scenarioId = this.route.snapshot.queryParamMap.get('scenario');
    if (scenarioId) {
      this.loadScenario(scenarioId);
    }
  }

  loadScenario(id: string) {
    const scenario = this.scenarioService.byId(id);
    if (!scenario) return;
    this.selectedScenarioId = id;
    this.flightForm.patchValue(scenario.flight);
    this.passengerForm.patchValue(scenario.passenger);
    this.incidentForm.patchValue(scenario.incident);
  }

  submitIncident() {
    const flightId = this.flightForm.value.flightId;

    const flight: Flight = {
      ...this.flightForm.value,
      flightDistanceKm: Number(this.flightForm.value.flightDistanceKm),
      distanceCategory: null,
      isRegulationApplicable: false
    };

    const passenger: Passenger = {
      flightId,
      ...this.passengerForm.value,
      ticketPrice: Number(this.passengerForm.value.ticketPrice),
      travelClass: this.passengerForm.value.travelClass as TravelClass,
      choice: this.passengerForm.value.choice as PassengerChoice
    };

    const incident: Incident = {
      flightId,
      ...this.incidentForm.value,
      type: this.incidentForm.value.type as IncidentType,
      cause: this.incidentForm.value.cause as DisruptionCause,
      delayHours: Number(this.incidentForm.value.delayHours),
      delayAtDestinationHours: Number(this.incidentForm.value.delayAtDestinationHours),
      noticeDaysBefore: Number(this.incidentForm.value.noticeDaysBefore),
      reroutingDepartEarlierHours: Number(this.incidentForm.value.reroutingDepartEarlierHours),
      reroutingArriveLaterHours: Number(this.incidentForm.value.reroutingArriveLaterHours),
      isExtraordinary: false
    };

    this.loading = true;
    this.error = '';
    this.reasoningService.processIncident(flight, passenger, incident).subscribe({
      next: (response) => {
        this.loading = false;
        this.router.navigate(['/analysis'], { state: { response, flight, passenger, incident } });
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Backend request failed. Is the backend running on port 8080?';
        console.error('[IncidentWizard] request failed', err);
      }
    });
  }
}
