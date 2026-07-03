export type FlightStatus = 'SCHEDULED' | 'ON_TIME' | 'DELAYED' | 'CANCELLED' | 'DEPARTED' | 'LANDED';

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  airlineCode: string;
  departureAirport: string;
  departureCity: string;
  arrivalAirport: string;
  arrivalCity: string;
  scheduledDeparture: string;
  scheduledArrival: string;
  actualDeparture?: string;
  actualArrival?: string;
  distanceKm: number;
  status: FlightStatus;
  delayMinutes?: number;
  isEUDeparture: boolean;
  isEUDestination: boolean;
  isEUCarrier: boolean;
  regulationApplicable: boolean;
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