import { Passenger } from './passenger.model';
export type IncidentType = 'DELAY' | 'CANCELLATION' | 'DENIED_BOARDING';
export type DistanceCategory = 'SHORT' | 'MEDIUM' | 'LONG';

export interface IncidentFacts {
  id: string;
  flightId: string;
  passenger: Passenger;
  incidentType: IncidentType;
  informedAt?: string;
  scheduledDeparture: string;
  delayAtDestinationMinutes?: number;
  cumulativeDelayMinutes?: number;
  cancellationReason?: string;
  daysBeforeDeparture?: number;
  deniedBoardingReason?: 'OVERBOOKING' | 'HEALTH' | 'SAFETY' | 'DOCUMENTS' | 'VOLUNTARY';
  alternativeFlightOffered: boolean;
  alternativeDepartureTime?: string;
  alternativeArrivalTime?: string;
  alternativeEarlierHours?: number;
  alternativeLaterHours?: number;
  offeredFood: boolean;
  offeredDrink: boolean;
  offeredAccommodation: boolean;
  offeredTransport: boolean;
  offeredPhoneCalls: boolean;
  extraordinaryCircumstances: boolean;
  extraordinaryCircumstanceType?: 'WEATHER' | 'POLITICAL' | 'SECURITY' | 'ATC_STRIKE' | 'AIRPORT_STRIKE' | 'ATC_DECISION' | 'TECHNICAL' | 'AIRLINE_STRIKE' | 'OTHER';
  missedConnection: boolean;
  connectingFlightId?: string;
  finalDestinationDelayMinutes?: number;
  currentAirportStatus: 'WAITING' | 'INFORMED_OF_CANCELLATION' | 'INFORMED_OF_DELAY' | 'DENIED_BOARDING_AT_GATE' | 'ON_ALTERNATIVE_FLIGHT' | 'RETURNED_HOME';
  downgraded: boolean;
  originalClass?: string;
  assignedClass?: string;
}