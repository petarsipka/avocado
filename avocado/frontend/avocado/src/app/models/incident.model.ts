export type IncidentType = 'CANCELLATION' | 'DELAY' | 'DENIED_BOARDING';

/** Matches backend DisruptionCause enum */
export type DisruptionCause =
  | 'NONE'
  | 'TECHNICAL_FAULT'       // not extraordinary (Wallentin-Hermann C-549/07)
  | 'WEATHER'               // extraordinary (recital 14)
  | 'POLITICAL_INSTABILITY' // extraordinary (recital 14)
  | 'SECURITY_RISK'         // extraordinary (recital 14)
  | 'ATC_STRIKE'            // extraordinary (recital 14)
  | 'AIRPORT_STRIKE'        // extraordinary (recital 14)
  | 'ATM_DECISION'          // extraordinary (recital 15)
  | 'AIRLINE_STAFF_STRIKE'; // not extraordinary (Krusemann C-195/17)

/** Backend Incident fact */
export interface Incident {
  flightId: string;
  type: IncidentType;
  noticeDaysBefore: number;
  cause: DisruptionCause;
  delayHours: number;
  delayAtDestinationHours: number;
  isExtraordinary: boolean;
  isRequiresOvernightStay: boolean;
  isReroutingOffered: boolean;
  reroutingDepartEarlierHours: number;
  reroutingArriveLaterHours: number;
  isDeniedAgainstWill: boolean;
  isVoluntarilyGaveUp: boolean;
  isDeniedForSafetyReasons: boolean;
  isDowngraded: boolean;
  isPartOfJourneyCompleted: boolean;
  isFlightNoLongerServesPurpose: boolean;
}
