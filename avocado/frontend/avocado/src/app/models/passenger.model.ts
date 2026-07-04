export type TravelClass = 'ECONOMY' | 'BUSINESS' | 'FIRST';
export type PassengerChoice = 'NONE' | 'REFUND' | 'REROUTING';

/** Backend Passenger fact */
export interface Passenger {
  flightId: string;
  travelClass: TravelClass;
  ticketPrice: number;
  isReducedMobility: boolean;
  isSmallChild: boolean;
  isPregnant: boolean;
  isCheckedInOnTime: boolean;
  isTravelingForFree: boolean;
  isFrequentFlyer: boolean;
  choice: PassengerChoice;
}
