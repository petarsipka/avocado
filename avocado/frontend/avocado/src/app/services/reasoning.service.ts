import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import { Incident, IncidentFacts } from '../models/incident.model';
import { Flight } from '../models/flight.model';
import { Passenger } from '../models/passenger.model';
import { LegalResultResponse } from '../models/legal.model';

/** Backend response for question verification */
export interface QuestionResponse {
  goal: string;
  satisfied: boolean;
}

@Injectable({ providedIn: 'root' })
export class ReasoningService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {}

  /**
   * USED: Send incident facts to backend Drools engine for legal analysis
   * @param flight Flight data
   * @param passenger Passenger data
   * @param incident Incident/disruption data
   * @returns Observable with compensations, rights, and advice from backend
   */
  processIncident(flight: Flight, passenger: Passenger, incident: Incident): Observable<LegalResultResponse> {
    const url = `${this.apiConfig.baseUrl}/incident`;
    const payload = {
      flight,
      passenger,
      incident
    };
    return this.http.post<LegalResultResponse>(url, payload);
  }

  /**
   * USED: Query backend using backward-chaining to verify if a specific goal is satisfied
   * @param goal The goal/right to check (e.g., 'COMPENSATION_400', 'CARE_MEALS')
   * @param flight Flight data context
   * @param passenger Passenger data context
   * @param incident Incident data context
   * @returns Observable with goal satisfaction result
   */
  askQuestion(goal: string, flight: Flight, passenger: Passenger, incident: Incident): Observable<QuestionResponse> {
    const url = `${this.apiConfig.baseUrl}/question`;
    const payload = {
      goal,
      flight,
      passenger,
      incident
    };
    return this.http.post<QuestionResponse>(url, payload);
  }
}