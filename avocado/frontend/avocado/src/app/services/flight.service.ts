import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FlightService {
  // NOT USED: Flight data is provided by users via incident-wizard form
  // Frontend uses hardcoded mock flights in components
  // Backend endpoints: GET /api/flights, POST /api/flights, GET /api/flights/{id}/events, WS /ws/flights/{id}
}
