import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightDisplay, Flight, FlightStatusEvent } from '../../models/flight.model';

@Component({
  selector: 'app-flight-tracker',
  templateUrl: './flight-tracker.component.html',
  styleUrls: ['./flight-tracker.component.css']
})
export class FlightTrackerComponent {
  flightForm: FormGroup;
  flights: FlightDisplay[] = [
    {
      flightId: '1', flightNumber: 'LH1411', airline: 'Lufthansa', airlineCode: 'LH',
      operatingCarrier: 'LH',
      departureAirport: 'BEG', departureCity: 'Belgrade',
      arrivalAirport: 'FRA', arrivalCity: 'Frankfurt',
      scheduledDeparture: '2026-07-03T10:00:00', scheduledArrival: '2026-07-03T11:50:00',
      flightDistanceKm: 1050, distanceCategory: 'MEDIUM', status: 'DELAYED', delayMinutes: 125,
      isFromEu: false, isToEu: true, isEuCarrier: true, isRegulationApplicable: true,
      isWithinEu: false, hasConfirmedReservation: true
    },
    {
      flightId: '2', flightNumber: 'LH1860', airline: 'Lufthansa', airlineCode: 'LH',
      operatingCarrier: 'LH',
      departureAirport: 'FRA', departureCity: 'Frankfurt',
      arrivalAirport: 'MAD', arrivalCity: 'Madrid',
      scheduledDeparture: '2026-07-03T13:30:00', scheduledArrival: '2026-07-03T16:00:00',
      flightDistanceKm: 1420, distanceCategory: 'MEDIUM', status: 'DEPARTED',
      isFromEu: true, isToEu: true, isEuCarrier: true, isRegulationApplicable: true,
      isWithinEu: true, hasConfirmedReservation: true
    }
  ];
  selectedFlight?: Flight;
  flightEvents: FlightStatusEvent[] = [];

  constructor(private fb: FormBuilder) {
    this.flightForm = this.fb.group({
      flightNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}\d{1,4}$/)]],
      departureAirport: ['', [Validators.required, Validators.minLength(3)]],
      arrivalAirport: ['', [Validators.required, Validators.minLength(3)]],
      scheduledDeparture: ['', Validators.required],
      airline: ['', Validators.required],
      distanceKm: [0, [Validators.required, Validators.min(1)]]
    });
  }

  addFlight() {
    if (this.flightForm.valid) {
      const newFlight: FlightDisplay = {
        ...this.flightForm.value,
        flightId: Date.now().toString(),
        operatingCarrier: this.flightForm.value.airline,
        departureCity: this.flightForm.value.departureAirport,
        arrivalCity: this.flightForm.value.arrivalAirport,
        scheduledArrival: '',
        flightDistanceKm: this.flightForm.value.distanceKm,
        distanceCategory: 'MEDIUM',
        status: 'SCHEDULED',
        isFromEu: false, isToEu: true, isEuCarrier: true, isRegulationApplicable: true,
        isWithinEu: false, hasConfirmedReservation: true
      };
      this.flights.push(newFlight);
      this.flightForm.reset();
    }
  }

  selectFlight(flight: FlightDisplay) {
    this.selectedFlight = flight;
    this.flightEvents = this.getMockEvents(flight.flightId);
  }

  private getMockEvents(flightId: string): FlightStatusEvent[] {
    if (flightId !== '1') return [];
    return [
      { id: 'e1', flightId: '1', flightNumber: 'LH1411', status: 'ON_TIME', timestamp: '2026-07-03T09:00:00', message: 'Flight scheduled on time', severity: 'INFO' },
      { id: 'e2', flightId: '1', flightNumber: 'LH1411', status: 'DELAYED', timestamp: '2026-07-03T11:30:00', delayMinutes: 60, newEta: '2026-07-03T12:50:00', message: 'Delay due to late incoming aircraft', severity: 'WARNING' },
      { id: 'e3', flightId: '1', flightNumber: 'LH1411', status: 'DELAYED', timestamp: '2026-07-03T12:15:00', delayMinutes: 125, newEta: '2026-07-03T13:55:00', message: 'Delay extended - awaiting crew', severity: 'CRITICAL' },
      { id: 'e4', flightId: '1', flightNumber: 'LH1411', status: 'LANDED', timestamp: '2026-07-03T13:55:00', message: 'Landed in Frankfurt', severity: 'INFO' }
    ];
  }
}