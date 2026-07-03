import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Flight, DistanceCategory } from '../../models/flight.model';
import { Incident, IncidentType } from '../../models/incident.model';
import { Passenger, TravelClass } from '../../models/passenger.model';
import { LegalQualification, RuleTrace, StrategicAdvice, CareRight, RerouteRight, Compensation, LegalResultResponse, RightType } from '../../models/legal.model';
import { ReasoningService } from '../../services/reasoning.service';

@Component({
  selector: 'app-incident-wizard',
  templateUrl: './incident-wizard.component.html',
  styleUrls: ['./incident-wizard.component.css']
})
export class IncidentWizardComponent {
  basicForm: FormGroup;
  incidentForm: FormGroup;
  circumstancesForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private reasoningService: ReasoningService) {
    this.basicForm = this.fb.group({
      flightId: ['', Validators.required],
      passengerName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      ticketClass: ['ECONOMY', Validators.required],
      ticketPrice: [0, Validators.min(0)],
      flightDistanceKm: [2400, Validators.min(0)],
      hasConfirmedReservation: [true],
      checkedInOnTime: [true],
      reducedMobility: [false],
      unaccompaniedMinor: [false]
    });

    this.incidentForm = this.fb.group({
      incidentType: ['DELAY', Validators.required],
      delayMinutes: [0],
      informedAt: [''],
      cancellationDaysBefore: [0],
      deniedBoardingReason: [''],
      missedConnection: [false],
      connectingFlightId: ['']
    });

    this.circumstancesForm = this.fb.group({
      alternativeFlightOffered: [false],
      offeredFood: [false],
      offeredDrink: [false],
      offeredAccommodation: [false],
      offeredTransport: [false],
      offeredPhoneCalls: [false],
      extraordinaryCircumstances: [false],
      extraordinaryCircumstanceType: [''],
      currentAirportStatus: ['WAITING']
    });
  }

  submitIncident() {
    const facts = { ...this.basicForm.value, ...this.incidentForm.value, ...this.circumstancesForm.value };

    const distanceKm = Number(this.basicForm.value.flightDistanceKm ?? 2400);
    const isWithinEu = distanceKm <= 3500;
    const distanceCategory: DistanceCategory = distanceKm <= 1500
      ? 'SHORT'
      : isWithinEu
        ? 'MEDIUM'
        : 'LONG';

    const flight: Flight = {
      flightId: this.basicForm.value.flightId || 'flight-001',
      operatingCarrier: 'Lufthansa',
      departureAirport: 'BEG',
      arrivalAirport: 'FRA',
      isFromEu: true,
      isToEu: true,
      isEuCarrier: true,
      isWithinEu,
      hasConfirmedReservation: this.basicForm.value.hasConfirmedReservation ?? true,
      flightDistanceKm: distanceKm,
      distanceCategory,
      isRegulationApplicable: false
    };

    const passenger: Passenger = {
      flightId: flight.flightId,
      travelClass: (this.basicForm.value.ticketClass as TravelClass) || 'ECONOMY',
      ticketPrice: Number(this.basicForm.value.ticketPrice ?? 0),
      isReducedMobility: this.basicForm.value.reducedMobility ?? false,
      isSmallChild: this.basicForm.value.unaccompaniedMinor ?? false,
      isPregnant: false,
      isCheckedInOnTime: this.basicForm.value.checkedInOnTime ?? true,
      isTravelingForFree: false,
      isFrequentFlyer: false,
      choice: 'NONE'
    };

    const incident: Incident = {
      flightId: flight.flightId,
      type: (this.incidentForm.value.incidentType as IncidentType) || 'DELAY',
      noticeDaysBefore: this.incidentForm.value.cancellationDaysBefore ?? 0,
      cause: 'NONE',
      delayHours: Math.max(0, (this.incidentForm.value.delayMinutes ?? 0) / 60),
      delayAtDestinationHours: Math.max(0, (this.incidentForm.value.delayMinutes ?? 0) / 60),
      isExtraordinary: this.circumstancesForm.value.extraordinaryCircumstances ?? false,
      isRequiresOvernightStay: this.circumstancesForm.value.offeredAccommodation ?? false,
      isReroutingOffered: this.circumstancesForm.value.alternativeFlightOffered ?? false,
      reroutingDepartEarlierHours: 0,
      reroutingArriveLaterHours: 0,
      isDeniedAgainstWill: false,
      isVoluntarilyGaveUp: false,
      isDeniedForSafetyReasons: false,
      isDowngraded: false,
      isPartOfJourneyCompleted: true,
      isFlightNoLongerServesPurpose: false
    };

    console.debug('[IncidentWizard] submitting incident facts', { facts, flight, passenger, incident });

    this.reasoningService.processIncident(flight, passenger, incident).subscribe({
      next: (response) => {
        console.debug('[IncidentWizard] backend legal response', response);
        const qualification = this.createQualificationFromResponse(response);
        this.router.navigate(['/analysis'], { state: { qualification, facts } });
      },
      error: (error) => {
        console.error('[IncidentWizard] backend legal request failed', error);
        const qualification = this.getUnavailableQualification();
        this.router.navigate(['/analysis'], { state: { qualification, facts } });
      }
    });
  }

  private createQualificationFromResponse(response: LegalResultResponse): LegalQualification {
    const compensation = response.compensations?.[0] ? {
      article: response.compensations[0].article,
      amountEur: response.compensations[0].amountEur,
      explanation: response.compensations[0].explanation
    } : {
      article: '',
      amountEur: 0,
      explanation: 'The backend did not return a compensation decision for these facts.'
    };

    const rights = response.rights || [];
    const careRights: CareRight[] = rights
      .filter((right) => ['CARE_MEALS', 'CARE_PHONE', 'HOTEL', 'HOTEL_TRANSPORT'].includes(right.type))
      .map((right) => ({
        type: right.type as RightType,
        article: right.article,
        description: right.description
      }));

    const rerouteRights: RerouteRight[] = rights
      .filter((right) => ['REFUND', 'REROUTING', 'ALTERNATIVE_FLIGHT'].includes(right.type))
      .map((right) => ({
        type: right.type as RightType,
        article: right.article,
        description: right.description
      }));

    const strategicAdvice: StrategicAdvice[] = (response.advice || []).map((advice, index) => ({
      priority: index + 1,
      category: (advice.priority ?? 1) <= 2 ? 'IMMEDIATE' : 'PROCEDURAL',
      title: advice.title,
      description: advice.description,
      articleReference: advice.articleReference ?? 'Backend advice',
      actionRequired: advice.actionRequired ?? true,
      deadline: advice.deadline
    }));

    return {
      id: 'lq-backend',
      incidentId: 'inc-backend',
      regulationApplicable: true,
      applicableArticles: ['Art. 3', 'Art. 6', 'Art. 7', 'Art. 8', 'Art. 9'],
      incidentType: 'DELAY',
      distanceCategory: 'MEDIUM',
      compensation,
      careRights,
      rerouteRights,
      extraordinaryCircumstance: false,
      strategicAdvice,
      ruleTrace: [],
      overallConfidence: response.compensations?.length || response.rights?.length || response.advice?.length ? 0.95 : 0.6
    };
  }

  private getUnavailableQualification(): LegalQualification {
    return {
      id: 'lq-unavailable',
      incidentId: 'inc-unavailable',
      regulationApplicable: false,
      applicableArticles: [],
      incidentType: 'UNKNOWN',
      distanceCategory: 'UNKNOWN',
      compensation: {
        article: '',
        amountEur: 0,
        explanation: 'The reasoning service could not return a legal assessment. Please verify that the backend is running.'
      },
      careRights: [],
      rerouteRights: [],
      extraordinaryCircumstance: false,
      strategicAdvice: [],
      ruleTrace: [],
      overallConfidence: 0
    };
  }
}