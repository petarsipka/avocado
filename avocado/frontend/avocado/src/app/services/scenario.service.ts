import { Injectable } from '@angular/core';
import { Flight } from '../models/flight.model';
import { Incident } from '../models/incident.model';
import { Passenger } from '../models/passenger.model';

export interface Scenario {
  id: string;
  name: string;
  specRef: string;
  description: string;
  expected: string;
  flight: Flight;
  passenger: Passenger;
  incident: Incident;
}

const DEFAULT_INCIDENT: Omit<Incident, 'flightId'> = {
  type: 'DELAY',
  noticeDaysBefore: 0,
  cause: 'NONE',
  delayHours: 0,
  delayAtDestinationHours: 0,
  isExtraordinary: false,
  isRequiresOvernightStay: false,
  isReroutingOffered: false,
  reroutingDepartEarlierHours: 0,
  reroutingArriveLaterHours: 0,
  isDeniedAgainstWill: false,
  isVoluntarilyGaveUp: false,
  isDeniedForSafetyReasons: false,
  isDowngraded: false,
  isPartOfJourneyCompleted: false,
  isFlightNoLongerServesPurpose: false
};

const DEFAULT_PASSENGER: Omit<Passenger, 'flightId'> = {
  travelClass: 'ECONOMY',
  ticketPrice: 250,
  isReducedMobility: false,
  isSmallChild: false,
  isPregnant: false,
  isCheckedInOnTime: true,
  isTravelingForFree: false,
  isFrequentFlyer: false,
  choice: 'NONE'
};

function flight(f: Partial<Flight> & { flightId: string }): Flight {
  return {
    isFromEu: true, isToEu: true, isEuCarrier: true, isWithinEu: true,
    hasConfirmedReservation: true, flightDistanceKm: 1000, distanceCategory: null,
    ...f
  };
}

function passenger(flightId: string, p: Partial<Passenger> = {}): Passenger {
  return { flightId, ...DEFAULT_PASSENGER, ...p };
}

function incident(flightId: string, i: Partial<Incident>): Incident {
  return { flightId, ...DEFAULT_INCIDENT, ...i };
}

@Injectable({ providedIn: 'root' })
export class ScenarioService {

  readonly scenarios: Scenario[] = [
    {
      id: 'ana',
      name: 'Ana: Belgrade → Frankfurt → Madrid',
      specRef: 'Spec §5 (end-to-end example)',
      description: 'Lufthansa LH1411 delayed 2h+, missed connection LH1860, total delay at Madrid 3.5h. Journey distance 2400 km.',
      expected: '€400 (Art. 7(1)(b)), care rights (Art. 9), hotel (overnight)',
      flight: flight({
        flightId: 'LH1411', departureAirport: 'BEG', arrivalAirport: 'MAD', operatingCarrier: 'Lufthansa',
        isFromEu: false, isToEu: true, isEuCarrier: true, isWithinEu: false,
        flightDistanceKm: 2400, reservationId: 'R1'
      }),
      passenger: passenger('LH1411', { ticketPrice: 320 }),
      incident: incident('LH1411', {
        type: 'DELAY', delayHours: 3, delayAtDestinationHours: 3.5, isRequiresOvernightStay: true
      })
    },
    {
      id: 'short-delay',
      name: 'Short flight, small delay: Paris → Zurich',
      specRef: 'Table 2.2 (Art. 6(1)(a))',
      description: 'Air France, 780 km, delay 2.5h at departure and destination. Below the 3h compensation threshold.',
      expected: 'Care only (meals, phone) - NO compensation',
      flight: flight({
        flightId: 'AF1234', departureAirport: 'CDG', arrivalAirport: 'ZRH', operatingCarrier: 'Air France',
        flightDistanceKm: 780
      }),
      passenger: passenger('AF1234'),
      incident: incident('AF1234', { type: 'DELAY', delayHours: 2.5, delayAtDestinationHours: 2.5 })
    },
    {
      id: 'long-delay',
      name: 'Long-haul delay: Frankfurt → Delhi',
      specRef: 'Tables 2.2, 3.1 (Art. 6, 7(1)(c), 8(1)(a))',
      description: 'Lufthansa, 6100 km, delay 5.5h. Passenger chooses a refund.',
      expected: '€600 (Art. 7(1)(c)), refund right (5h+), care (4h+)',
      flight: flight({
        flightId: 'LH760', departureAirport: 'FRA', arrivalAirport: 'DEL', operatingCarrier: 'Lufthansa',
        isToEu: false, isWithinEu: false, flightDistanceKm: 6100
      }),
      passenger: passenger('LH760', { ticketPrice: 780, choice: 'REFUND' }),
      incident: incident('LH760', {
        type: 'DELAY', delayHours: 5.5, delayAtDestinationHours: 5.5, isRequiresOvernightStay: true
      })
    },
    {
      id: 'cancel-late',
      name: 'Late cancellation: Madrid → Paris',
      specRef: 'Table 2.1 (Art. 5(1)(c))',
      description: 'Iberia, 1050 km, cancelled 3 days before departure with no acceptable rerouting.',
      expected: '€250 (Art. 7(1)(a)), care + refund/rerouting choice',
      flight: flight({
        flightId: 'IB3151', departureAirport: 'MAD', arrivalAirport: 'CDG', operatingCarrier: 'Iberia',
        flightDistanceKm: 1050
      }),
      passenger: passenger('IB3151'),
      incident: incident('IB3151', { type: 'CANCELLATION', noticeDaysBefore: 3 })
    },
    {
      id: 'cancel-early',
      name: 'Early cancellation: Madrid → Paris',
      specRef: 'Table 2.1 (Art. 5(1)(c)(i))',
      description: 'Same flight, but the passenger was informed 20 days before departure.',
      expected: 'NO compensation - care + choice remain',
      flight: flight({
        flightId: 'IB3151', departureAirport: 'MAD', arrivalAirport: 'CDG', operatingCarrier: 'Iberia',
        flightDistanceKm: 1050
      }),
      passenger: passenger('IB3151'),
      incident: incident('IB3151', { type: 'CANCELLATION', noticeDaysBefore: 20 })
    },
    {
      id: 'weather-cancel',
      name: 'Weather cancellation: Vienna → Amsterdam',
      specRef: 'Table 2.4 (Art. 5(3), recital 14)',
      description: 'Austrian, 960 km, cancelled 1 day before due to severe weather (extraordinary circumstance).',
      expected: 'NO compensation (Art. 5(3)) - care rights remain',
      flight: flight({
        flightId: 'OS371', departureAirport: 'VIE', arrivalAirport: 'AMS', operatingCarrier: 'Austrian',
        flightDistanceKm: 960
      }),
      passenger: passenger('OS371'),
      incident: incident('OS371', { type: 'CANCELLATION', noticeDaysBefore: 1, cause: 'WEATHER' })
    },
    {
      id: 'denied-boarding',
      name: 'Denied boarding (overbooking): Frankfurt → Rome',
      specRef: 'Table 2.3 (Art. 4)',
      description: 'Lufthansa, 960 km, passenger checked in on time but was denied boarding against her will.',
      expected: '€250 (Art. 7(1)(a)), care + choice (Art. 8, 9)',
      flight: flight({
        flightId: 'LH232', departureAirport: 'FRA', arrivalAirport: 'FCO', operatingCarrier: 'Lufthansa',
        flightDistanceKm: 960
      }),
      passenger: passenger('LH232', { isReducedMobility: true }),
      incident: incident('LH232', { type: 'DENIED_BOARDING', isDeniedAgainstWill: true })
    },
    {
      id: 'downgrade',
      name: 'Class downgrade: Madrid → São Paulo',
      specRef: 'Table 3.4 (Art. 10(2)(c))',
      description: 'Iberia long-haul 8360 km, business ticket (€1200), passenger seated in economy.',
      expected: '75% ticket refund = €900 (Art. 10(2)(c))',
      flight: flight({
        flightId: 'IB6825', departureAirport: 'MAD', arrivalAirport: 'GRU', operatingCarrier: 'Iberia',
        isToEu: false, isWithinEu: false, flightDistanceKm: 8360
      }),
      passenger: passenger('IB6825', { travelClass: 'BUSINESS', ticketPrice: 1200 }),
      incident: incident('IB6825', { type: 'DELAY', isDowngraded: true })
    }
  ];

  byId(id: string): Scenario | undefined {
    return this.scenarios.find(s => s.id === id);
  }
}
