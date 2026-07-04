import { Flight, FlightStatusEvent } from './flight.model';

/** Backend Notification output fact (CEP) */
export interface CepNotification {
  message: string;
  article: string;
}

/** Backend MissedConnection output fact (CEP) */
export interface MissedConnection {
  reservationId: string;
  landedFlightId: string;
  departedFlightId: string;
}

/** Response from POST /api/simulation and /api/simulation/custom */
export interface CepResult {
  notifications: CepNotification[];
  missedConnections: MissedConnection[];
}

/** Request body for POST /api/simulation/custom */
export interface SimulationData {
  flights: Flight[];
  events: FlightStatusEvent[];
}
