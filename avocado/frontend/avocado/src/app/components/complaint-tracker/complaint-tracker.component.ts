import { Component } from '@angular/core';
import { ComplaintProcess } from '../../models/complaint.model';

@Component({
  selector: 'app-complaint-tracker',
  templateUrl: './complaint-tracker.component.html',
  styleUrls: ['./complaint-tracker.component.css']
})
export class ComplaintTrackerComponent {
  complaints: ComplaintProcess[] = [
    {
      id: 'comp-001', incidentId: 'inc-001', flightId: '1', airline: 'Lufthansa',
      status: 'SUBMITTED',
      submittedAt: '2026-07-03T14:00:00',
      airlineResponseDeadline: '2026-08-14T14:00:00',
      escalationDeadline: '2026-08-21T14:00:00',
      statuteOfLimitations: '2029-12-31T23:59:59',
      currentStep: 2, totalSteps: 5,
      events: [
        { id: 'e1', date: '2026-07-03T14:00:00', title: 'Complaint Submitted', description: 'Written complaint sent to Lufthansa customer service', type: 'MILESTONE', completed: true },
        { id: 'e2', date: '2026-08-14T14:00:00', title: 'Airline Response Deadline', description: 'Lufthansa must respond within 6 weeks', type: 'DEADLINE', completed: false },
        { id: 'e3', date: '2026-08-21T14:00:00', title: 'Escalation Deadline', description: 'If no response, escalate to BAF', type: 'ALERT', completed: false }
      ],
      evidence: [
        { id: 'ev1', type: 'BOARDING_PASS', description: 'Original boarding pass BEG-FRA', importance: 'CRITICAL', collected: true },
        { id: 'ev2', type: 'FLIGHT_STATUS_SCREENSHOT', description: 'Screenshot showing 3h+ delay', importance: 'CRITICAL', collected: true },
        { id: 'ev3', type: 'RECEIPT_HOTEL', description: 'Hotel receipt Frankfurt (if self-booked)', importance: 'HIGH', collected: false }
      ],
      recommendedAuthority: 'BAF (Bundesamt für Justiz)',
      recommendedAuthorityUrl: 'https://www.bundesamt-fuer-justiz.de',
      notes: 'Passenger was proactive in requesting care. Airline initially refused hotel.'
    }
  ];

  getStatusColor(status: string): string {
    switch(status) {
      case 'RESOLVED': return 'primary';
      case 'REJECTED': return 'warn';
      case 'ESCALATED_TO_AUTHORITY': return 'accent';
      default: return '';
    }
  }
}