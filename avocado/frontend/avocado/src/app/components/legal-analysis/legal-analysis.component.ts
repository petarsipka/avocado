import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LegalResultResponse, Right } from '../../models/legal.model';
import { Flight } from '../../models/flight.model';
import { Incident } from '../../models/incident.model';
import { Passenger } from '../../models/passenger.model';

@Component({
  selector: 'app-legal-analysis',
  templateUrl: './legal-analysis.component.html',
  styleUrls: ['./legal-analysis.component.css']
})
export class LegalAnalysisComponent {
  response?: LegalResultResponse;
  flight?: Flight;
  passenger?: Passenger;
  incident?: Incident;

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras?.state;
    this.response = state?.['response'];
    this.flight = state?.['flight'];
    this.passenger = state?.['passenger'];
    this.incident = state?.['incident'];
  }

  get careRights(): Right[] {
    return (this.response?.rights || []).filter(r =>
      ['CARE_MEALS', 'CARE_PHONE', 'HOTEL', 'HOTEL_TRANSPORT', 'CARE_PRIORITY'].includes(r.type));
  }

  get choiceRights(): Right[] {
    return (this.response?.rights || []).filter(r =>
      ['REFUND', 'REROUTING', 'ALTERNATIVE_FLIGHT'].includes(r.type));
  }

  get compensationRights(): Right[] {
    return (this.response?.rights || []).filter(r => r.type === 'COMPENSATION');
  }

  goToWizard() {
    this.router.navigate(['/incident']);
  }
}
