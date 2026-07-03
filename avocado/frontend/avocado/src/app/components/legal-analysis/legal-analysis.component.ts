import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LegalQualification, RuleTrace, StrategicAdvice, CareRight, RerouteRight, Compensation } from '../../models/legal.model';

@Component({
  selector: 'app-legal-analysis',
  templateUrl: './legal-analysis.component.html',
  styleUrls: ['./legal-analysis.component.css']
})
export class LegalAnalysisComponent implements OnInit {
  qualification?: LegalQualification;
  facts?: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.qualification = nav?.extras?.state?.['qualification'];
    this.facts = nav?.extras?.state?.['facts'];

    if (!this.qualification) {
      this.qualification = this.getFallbackQualification();
    }
  }

  ngOnInit() {}

  startComplaint() {
    this.router.navigate(['/complaints']);
  }

  private getFallbackQualification(): LegalQualification {
    // Same hardcoded data as incident-wizard for direct page refresh
    const compensation: Compensation = {
      article: 'Art. 7(1)(b)',
      amountEur: 400,
      explanation: 'Delay at final destination exceeded 3 hours. Distance 2400km.'
    };

    const careRights: CareRight[] = [
      { type: 'CARE_MEALS', article: 'Art. 9(1)(a)', description: 'Meals and refreshments', activatedAtDelayMinutes: 120 },
      { type: 'CARE_PHONE', article: 'Art. 9(2)', description: 'Two free telephone calls', activatedAtDelayMinutes: 120 },
      { type: 'HOTEL', article: 'Art. 9(1)(b)', description: 'Hotel accommodation', activatedAtDelayMinutes: 300 },
      { type: 'HOTEL_TRANSPORT', article: 'Art. 9(1)(c)', description: 'Transport airport-hotel', activatedAtDelayMinutes: 300 }
    ];

    const rerouteRights: RerouteRight[] = [
      { type: 'REROUTING', article: 'Art. 8(1)(b)', description: 'Re-routing to final destination' },
      { type: 'REFUND', article: 'Art. 8(1)(a)', description: 'Full refund within 7 days' }
    ];

    const strategicAdvice: StrategicAdvice[] = [
      { priority: 1, category: 'IMMEDIATE', title: 'Request Care Immediately', description: 'Airline must provide food/drink after 2h delay.', articleReference: 'Art. 9', actionRequired: true },
      { priority: 2, category: 'IMMEDIATE', title: 'Do Not Accept Voucher', description: 'You have the right to cash compensation.', articleReference: 'Art. 7(3)', actionRequired: true },
      { priority: 3, category: 'PROCEDURAL', title: 'Submit Written Complaint', description: 'Send formal complaint to Lufthansa.', articleReference: 'Art. 7', actionRequired: true, deadline: 'Within 6 weeks' },
      { priority: 4, category: 'PROCEDURAL', title: 'Escalation Path', description: 'If no response: contact German BAF.', articleReference: 'National Enforcement', actionRequired: false },
      { priority: 5, category: 'EVIDENCE', title: 'Preserve Evidence', description: 'Boarding pass, screenshots, receipts.', articleReference: 'General', actionRequired: true }
    ];

    const ruleTrace: RuleTrace[] = [
      { ruleId: 'FC-L1-001', ruleName: 'Regulation Applicability', level: 1, condition: 'EU departure OR (EU destination AND EU carrier)', action: 'Applicable = TRUE', articleReference: 'Art. 3', fired: true, timestamp: '2026-07-03T10:00:00Z' },
      { ruleId: 'FC-L1-002', ruleName: 'Distance Category', level: 1, condition: '1500 < distance <= 3500', action: 'Category = MEDIUM', articleReference: 'Art. 7(1)', fired: true, timestamp: '2026-07-03T10:00:01Z' },
      { ruleId: 'FC-L2-001', ruleName: 'Delay Compensation Trigger', level: 2, condition: 'Destination delay >= 3h', action: 'Art. 7 compensation activated', articleReference: 'Art. 6, Sturgeon C-402/07', fired: true, timestamp: '2026-07-03T10:00:02Z' },
      { ruleId: 'FC-L3-001', ruleName: 'Compensation Amount', level: 3, condition: 'MEDIUM distance', action: 'Amount = 400 EUR', articleReference: 'Art. 7(1)(b)', fired: true, timestamp: '2026-07-03T10:00:03Z' },
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