import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LegalQualification, RuleTrace, StrategicAdvice, CareRight, RerouteRight, Compensation } from '../../models/legal.model';

@Component({
  selector: 'app-incident-wizard',
  templateUrl: './incident-wizard.component.html',
  styleUrls: ['./incident-wizard.component.css']
})
export class IncidentWizardComponent {
  basicForm: FormGroup;
  incidentForm: FormGroup;
  circumstancesForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
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
    const qualification = this.getHardcodedQualification();
    this.router.navigate(['/analysis'], { state: { qualification, facts } });
  }

  private getHardcodedQualification(): LegalQualification {
    const compensation: Compensation = {
      applicable: true, amount: 400, currency: 'EUR', article: 'Art. 7(1)(b)',
      distanceCategory: 'MEDIUM (1500-3500 km)', reducedBy50Percent: false,
      reason: 'Delay at final destination exceeded 3 hours. Distance 2400km.'
    };

    const careRights: CareRight[] = [
      { type: 'FOOD_DRINK', applicable: true, article: 'Art. 9(1)(a)', description: 'Meals and refreshments in reasonable relation to waiting time', activatedAtDelayMinutes: 120 },
      { type: 'PHONE_CALLS', applicable: true, article: 'Art. 9(2)', description: 'Two free telephone calls, telex or fax messages, or emails', activatedAtDelayMinutes: 120 },
      { type: 'HOTEL', applicable: true, article: 'Art. 9(1)(b)', description: 'Hotel accommodation when stay of one or more nights is necessary', activatedAtDelayMinutes: 300 },
      { type: 'TRANSPORT', applicable: true, article: 'Art. 9(1)(c)', description: 'Transport between airport and place of accommodation', activatedAtDelayMinutes: 300 }
    ];

    const rerouteRights: RerouteRight[] = [
      { type: 'REROUTE', applicable: true, article: 'Art. 8(1)(b)', description: 'Re-routing to final destination at earliest opportunity' },
      { type: 'REFUND', applicable: true, article: 'Art. 8(1)(a)', description: 'Full refund of ticket within 7 days' }
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