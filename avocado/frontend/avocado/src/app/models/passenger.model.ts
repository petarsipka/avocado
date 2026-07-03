export type TravelClass = 'ECONOMY' | 'BUSINESS' | 'FIRST';
export type PassengerChoice = 'NONE' | 'REFUND' | 'REROUTING' | 'OTHER';

/** Backend Passenger model from Drools facts */
export interface Passenger {
  flightId: string;           // from backend
  travelClass: TravelClass;   // from backend (replaces ticketClass)
  ticketPrice: number;        // from backend
  isReducedMobility: boolean; // from backend (replaces reducedMobility)
  isSmallChild: boolean;      // from backend (replaces unaccompaniedMinor)
  isPregnant: boolean;        // from backend
  isCheckedInOnTime: boolean; // from backend (replaces checkedInOnTime)
  isTravelingForFree: boolean; // from backend (replaces isFreeTicket)
  isFrequentFlyer: boolean;   // from backend
  choice: PassengerChoice;    // from backend
  
  // UI-only fields (not sent to backend)
  id?: string;               // for display only
  name?: string;             // for display only
  email?: string;            // for display only
  arrivedAtCheckInMinutesBefore?: number; // for display only
}