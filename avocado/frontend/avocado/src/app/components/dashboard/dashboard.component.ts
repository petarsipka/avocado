import { Component } from '@angular/core';
import { Flight, FlightStatusEvent } from '../../models/flight.model';
import { CepAlert } from '../../models/cep.model';
import { ComplaintProcess } from '../../models/complaint.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  flights: Flight[] = [
    {
      id: '1', flightNumber: 'LH1411', airline: 'Lufthansa', airlineCode: 'LH',
      departureAirport: 'BEG', departureCity: 'Belgrade',
      arrivalAirport: 'FRA', arrivalCity: 'Frankfurt',
      scheduledDeparture: '2026-07-03T10:00:00', scheduledArrival: '2026-07-03T11:50:00',
      distanceKm: 1050, status: 'DELAYED', delayMinutes: 125,
      isEUDeparture: false, isEUDestination: true, isEUCarrier: true, regulationApplicable: true
    },
    {
      id: '2', flightNumber: 'LH1860', airline: 'Lufthansa', airlineCode: 'LH',
      departureAirport: 'FRA', departureCity: 'Frankfurt',
      arrivalAirport: 'MAD', arrivalCity: 'Madrid',
      scheduledDeparture: '2026-07-03T13:30:00', scheduledArrival: '2026-07-03T16:00:00',
      distanceKm: 1420, status: 'DEPARTED',
      isEUDeparture: true, isEUDestination: true, isEUCarrier: true, regulationApplicable: true
    }
  ];

  alerts: CepAlert[] = [
    {
      id: 'cep-1', flightId: '1', flightNumber: 'LH1411',
      scenario: 'DELAY_ESCALATION', severity: 'CRITICAL',
      title: 'Delay Escalation: 125 minutes',
      message: 'Flight LH1411 delay exceeded 2h (care rights) and 3h (compensation threshold). Articles 7 & 9 rights activated.',
      triggeredAt: '2026-07-03T12:15:00',
      articleReference: 'Art. 7, Art. 9, Sturgeon C-402/07',
      rightsActivated: ['Financial Compensation', 'Food & Drink', 'Phone Calls'],
      recommendedAction: 'Document delay, prepare compensation claim, request care immediately',
      acknowledged: false
    },
    {
      id: 'cep-2', flightId: '1', flightNumber: 'LH1411',
      scenario: 'MISSED_CONNECTION', severity: 'CRITICAL',
      title: 'Missed Connecting Flight',
      message: 'LH1411 landed at 13:55, LH1860 departed at 13:30. Connection missed. Aggregated claim applies per Folkerts C-11/11.',
      triggeredAt: '2026-07-03T13:55:00',
      articleReference: 'Art. 8, Folkerts C-11/11',
      rightsActivated: ['Alternative Flight', 'Aggregated Compensation'],
      recommendedAction: 'Go to Lufthansa transfer desk for rebooking',
      acknowledged: false
    }
  ];

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
}