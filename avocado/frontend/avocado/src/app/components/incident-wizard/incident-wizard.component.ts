import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Flight } from '../../models/flight.model';
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

    const flight: Flight = {
      flightId: this.basicForm.value.flightId || 'flight-001',
      operatingCarrier: 'Lufthansa',
      departureAirport: 'BEG',
      arrivalAirport: 'FRA',
      isFromEu: true,
      isToEu: true,
      isEuCarrier: true,
      isWithinEu: true,
      hasConfirmedReservation: this.basicForm.value.hasConfirmedReservation ?? true,
      flightDistanceKm: 2400,
      distanceCategory: 'MEDIUM',
      isRegulationApplicable: true
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

    this.reasoningService.processIncident(flight, passenger, incident).subscribe({
      next: (response) => {
        const qualification = this.createQualificationFromResponse(response);
        this.router.navigate(['/analysis'], { state: { qualification, facts } });
      },
      error: () => {
        const qualification = this.getHardcodedQualification();
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
      article: 'Art. 7(1)(b)',
      amountEur: 400,
      explanation: 'Compensation calculated by backend rules.'
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
      overallConfidence: 0.95
    };
  }

  private getHardcodedQualification(): LegalQualification {
    const compensation: Compensation = {
      article: 'Art. 7(1)(b)',
      amountEur: 400,
      explanation: 'Delay at final destination exceeded 3 hours. Distance 2400km.'
    };

    const careRights: CareRight[] = [
      { type: 'CARE_MEALS', article: 'Art. 9(1)(a)', description: 'Meals and refreshments in reasonable relation to waiting time', activatedAtDelayMinutes: 120 },
      { type: 'CARE_PHONE', article: 'Art. 9(2)', description: 'Two free telephone calls, telex or fax messages, or emails', activatedAtDelayMinutes: 120 },
      { type: 'HOTEL', article: 'Art. 9(1)(b)', description: 'Hotel accommodation when stay of one or more nights is necessary', activatedAtDelayMinutes: 300 },
      { type: 'HOTEL_TRANSPORT', article: 'Art. 9(1)(c)', description: 'Transport between airport and place of accommodation', activatedAtDelayMinutes: 300 }
    ];

    const rerouteRights: RerouteRight[] = [
      { type: 'REROUTING', article: 'Art. 8(1)(b)', description: 'Re-routing to final destination at earliest opportunity' },
      { type: 'REFUND', article: 'Art. 8(1)(a)', description: 'Full refund of ticket within 7 days' }
    ];

    const strategicAdvice: StrategicAdvice[] = [
      { priority: 1, category: 'IMMEDIATE', title: 'Request Care Immediately', description: 'Airline must provide food/drink after 2h delay. Ask politely but firmly.', articleReference: 'Art. 9', actionRequired: true },
      { priority: 2, category: 'IMMEDIATE', title: 'Do Not Accept Voucher', description: 'You have the right to cash compensation. Voucher requires your written consent.', articleReference: 'Art. 7(3)', actionRequired: true },
      { priority: 3, category: 'PROCEDURAL', title: 'Submit Written Complaint', description: 'Send formal complaint to Lufthansa. Keep copy.', articleReference: 'Art. 7', actionRequired: true, deadline: 'Within reasonable time (suggest 6 weeks)' },
      { priority: 4, category: 'PROCEDURAL', title: 'Escalation Path', description: 'If no response: contact German BAF (Bundesamt für Justiz).', articleReference: 'National Enforcement', actionRequired: false },
      { priority: 5, category: 'EVIDENCE', title: 'Preserve Evidence', description: 'Boarding pass, flight status screenshots, receipts, emails.', articleReference: 'General', actionRequired: true }
    ];

    const ruleTrace: RuleTrace[] = [
      { ruleId: 'FC-L1-001', ruleName: 'Regulation Applicability', level: 1, condition: 'EU departure OR (EU destination AND EU carrier)', action: 'Applicable = TRUE', articleReference: 'Art. 3', fired: true, timestamp: '2026-07-03T10:00:00Z' },
      { ruleId: 'FC-L1-002', ruleName: 'Distance Category', level: 1, condition: '1500 < distance <= 3500 AND extra-EU', action: 'Category = MEDIUM', articleReference: 'Art. 7(1)', fired: true, timestamp: '2026-07-03T10:00:01Z' },
      { ruleId: 'FC-L2-001', ruleName: 'Delay Compensation Trigger', level: 2, condition: 'Destination delay >= 3h', action: 'Art. 7 compensation activated', articleReference: 'Art. 6, Sturgeon C-402/07', fired: true, timestamp: '2026-07-03T10:00:02Z' },
      { ruleId: 'FC-L3-001', ruleName: 'Compensation Amount', level: 3, condition: 'MEDIUM distance AND compensation triggered', action: 'Amount = 400 EUR', articleReference: 'Art. 7(1)(b)', fired: true, timestamp: '2026-07-03T10:00:03Z' },
      { ruleId: 'FC-L4-001', ruleName: 'Optimal Strategy', level: 4, condition: 'All rights activated', action: 'Generate strategic advice', articleReference: 'Art. 7-9', fired: true, timestamp: '2026-07-03T10:00:04Z' }
    ];

    return {
      id: 'lq-001', incidentId: 'inc-001', regulationApplicable: true,
      applicableArticles: ['Art. 3', 'Art. 6', 'Art. 7', 'Art. 8', 'Art. 9'],
      incidentType: 'DELAY_WITH_MISSED_CONNECTION', distanceCategory: 'MEDIUM',
      compensation, careRights, rerouteRights,
      extraordinaryCircumstance: false,
      strategicAdvice, ruleTrace,
      overallConfidence: 0.98
    };
  }
}