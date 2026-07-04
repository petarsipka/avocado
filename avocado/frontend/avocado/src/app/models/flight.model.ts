export type FlightStatus = 'ON_TIME' | 'DELAYED' | 'CANCELLED' | 'DEPARTED' | 'LANDED';
export type DistanceCategory = 'SHORT' | 'MEDIUM' | 'LONG';

/** Backend Flight fact */
export interface Flight {
  flightId: string;
  date?: string;
  departureAirport?: string;
  arrivalAirport?: string;
  operatingCarrier?: string;
  isFromEu: boolean;
  isToEu: boolean;
  isEuCarrier: boolean;
  isWithinEu: boolean;
  hasConfirmedReservation: boolean;
  flightDistanceKm: number;
  distanceCategory?: DistanceCategory | null; // null so backend Level 1 rules derive it
  reservationId?: string;
  isRegulationApplicable?: boolean;
}

/** Backend FlightStatusEvent for CEP simulation (timestamp = ms from simulation start) */
export interface FlightStatusEvent {
  flightId: string;
  status: FlightStatus;
  timestamp: number;
  delayMinutes: number;
  reservationId: string;
}
