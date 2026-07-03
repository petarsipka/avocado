export type FlightStatus = 'SCHEDULED' | 'ON_TIME' | 'DELAYED' | 'CANCELLED' | 'DEPARTED' | 'LANDED';
export type DistanceCategory = 'SHORT' | 'MEDIUM' | 'LONG';

/** Backend Flight model from Drools facts */
export interface Flight {
  flightId: string;           // from backend
  date?: string;              // from backend
  departureAirport: string;   // from backend
  arrivalAirport: string;     // from backend
  operatingCarrier: string;   // from backend (replaces airline)
  isFromEu: boolean;          // from backend (replaces isEUDeparture)
  isToEu: boolean;            // from backend (replaces isEUDestination)
  isEuCarrier: boolean;       // from backend
  isWithinEu: boolean;        // from backend
  hasConfirmedReservation: boolean; // from backend
  flightDistanceKm: number;   // from backend (replaces distanceKm)
  distanceCategory: DistanceCategory; // from backend
  reservationId?: string;     // from backend
  isRegulationApplicable: boolean; // from backend
  
  // UI-only fields (not sent to backend)
  flightNumber?: string;      // for display
  departureCity?: string;     // for display
  arrivalCity?: string;       // for display
  scheduledDeparture?: string; // for display
  scheduledArrival?: string;  // for display
  status?: FlightStatus;      // for UI state (SCHEDULED, DELAYED, etc)
  delayMinutes?: number;      // for CEP events
}

/** For UI mock data that has display properties */
export interface FlightDisplay extends Flight {
  flightNumber: string;
  airline?: string; // for display only
  airlineCode?: string; // for display only
  departureCity: string;
  arrivalCity: string;
  scheduledDeparture: string;
  scheduledArrival: string;
  status: FlightStatus;
}

export interface FlightStatusEvent {
  id: string;
  flightId: string;
  flightNumber: string;
  status: FlightStatus;
  timestamp: string;
  delayMinutes?: number;
  newEta?: string;
  message: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
}

export interface ConnectingFlight {
  id: string;
  firstFlightId: string;
  secondFlightId: string;
  reservationCode: string;
  firstFlightLanded?: string;
  secondFlightDeparted?: string;
  missed: boolean;
}