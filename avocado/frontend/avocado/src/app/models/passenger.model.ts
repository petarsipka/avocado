export interface Passenger {
  id: string;
  name: string;
  email: string;
  ticketClass: 'ECONOMY' | 'BUSINESS' | 'FIRST';
  ticketPrice: number;
  hasConfirmedReservation: boolean;
  checkedInOnTime: boolean;
  arrivedAtCheckInMinutesBefore?: number;
  reducedMobility: boolean;
  unaccompaniedMinor: boolean;
  isFrequentFlyer: boolean;
  isFreeTicket: boolean;
}