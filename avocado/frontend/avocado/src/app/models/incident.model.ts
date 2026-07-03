import { Passenger } from './passenger.model';

export type IncidentType = 'CANCELLATION' | 'DELAY' | 'DENIED_BOARDING';
export type DisruptionCause = 'NONE' | 'WEATHER' | 'ATC_STRIKE' | 'TECHNICAL' | 'AIRLINE_STRIKE' | 'AIRPORT_STRIKE';

/** Backend Incident model from Drools facts */
export interface Incident {
  flightId: string;                    // from backend
  type: IncidentType;                  // from backend (replaces incidentType)
  noticeDaysBefore: number;            // from backend (replaces daysBeforeDeparture)
  cause: DisruptionCause;              // from backend (replaces cancellationReason)
  delayHours: number;                  // from backend (from delayMinutes)
  delayAtDestinationHours: number;     // from backend (from delayAtDestinationMinutes)
  isExtraordinary: boolean;            // from backend (replaces extraordinaryCircumstances)
  isRequiresOvernightStay: boolean;    // from backend
  isReroutingOffered: boolean;         // from backend (replaces alternativeFlightOffered)
  reroutingDepartEarlierHours: number; // from backend (replaces alternativeEarlierHours)
  reroutingArriveLaterHours: number;   // from backend (replaces alternativeLaterHours)
  isDeniedAgainstWill: boolean;        // from backend
  isVoluntarilyGaveUp: boolean;        // from backend
  isDeniedForSafetyReasons: boolean;   // from backend
  isDowngraded: boolean;               // from backend (replaces downgraded)
  isPartOfJourneyCompleted: boolean;   // from backend
  isFlightNoLongerServesPurpose: boolean; // from backend
}

/** Extended incident for UI forms - includes display and intermediate fields */
export interface IncidentFacts extends Incident {
  id?: string;                         // for display only
  passenger?: Passenger;               // for display only
  informedAt?: string;                 // for display only
  scheduledDeparture?: string;         // for display only
  cumulativeDelayMinutes?: number;     // for display only
  deniedBoardingReason?: string;       // for display only
  alternativeDepartureTime?: string;   // for display only
  alternativeArrivalTime?: string;     // for display only
  offeredFood?: boolean;               // for display only
  offeredDrink?: boolean;              // for display only
  offeredAccommodation?: boolean;      // for display only
  offeredTransport?: boolean;          // for display only
  offeredPhoneCalls?: boolean;         // for display only
  extraordinaryCircumstanceType?: string; // for display only
  missedConnection?: boolean;          // for display only
  connectingFlightId?: string;         // for display only
  finalDestinationDelayMinutes?: number; // for display only
  currentAirportStatus?: string;       // for display only
  originalClass?: string;              // for display only
  assignedClass?: string;              // for display only
}