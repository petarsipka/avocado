import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import { Incident } from '../models/incident.model';
import { Flight } from '../models/flight.model';
import { Passenger } from '../models/passenger.model';
import { LegalResultResponse, QuestionResponse, Right } from '../models/legal.model';
import { CepResult, SimulationData } from '../models/cep.model';

@Injectable({ providedIn: 'root' })
export class ReasoningService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {}

  /** Forward chaining: POST /api/incident */
  processIncident(flight: Flight, passenger: Passenger, incident: Incident): Observable<LegalResultResponse> {
    return this.http.post<LegalResultResponse>(`${this.apiConfig.baseUrl}/incident`, { flight, passenger, incident });
  }

  /** Backward chaining: POST /api/question (goal = backend query name) */
  askQuestion(goal: string, flight: Flight, passenger: Passenger, incident: Incident): Observable<QuestionResponse> {
    return this.http.post<QuestionResponse>(`${this.apiConfig.baseUrl}/question`, { goal, flight, passenger, incident });
  }

  /** CEP preset scenario: POST /api/simulation (scenario: ana | delay | cancellation) */
  simulatePreset(scenario: string): Observable<CepResult> {
    return this.http.post<CepResult>(`${this.apiConfig.baseUrl}/simulation`, { scenario });
  }

  /** CEP custom event stream: POST /api/simulation/custom */
  simulateCustom(data: SimulationData): Observable<CepResult> {
    return this.http.post<CepResult>(`${this.apiConfig.baseUrl}/simulation/custom`, data);
  }

  /** Rule template: POST /api/rules/threshold */
  applyThreshold(minDelayHours: number, article: string, description: string, delayHours: number): Observable<Right[]> {
    return this.http.post<Right[]>(`${this.apiConfig.baseUrl}/rules/threshold`, {
      thresholds: [{ minDelayHours, article, description }],
      incident: { delayHours }
    });
  }
}
