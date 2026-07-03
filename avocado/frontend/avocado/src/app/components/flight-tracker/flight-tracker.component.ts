import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Flight, FlightStatusEvent } from '../../models/flight.model';

@Component({
  selector: 'app-flight-tracker',
  templateUrl: './flight-tracker.component.html',
  styleUrls: ['./flight-tracker.component.css']
})
export class FlightTrackerComponent {
  flightForm: FormGroup;
  flights: Flight[] = [
    {
      id: '1', flightNumber: 'LH1411', airline: 'Lufthansa', airlineCode: 'LH',
      departureAirport: 'BEG', departureCity: 'Belgrade',
      arrivalAirport: 'FRA', arrivalCity: 'Frankfurt',
      scheduledDeparture: '2026-07-03T10:00:00', scheduledArrival: '2026-07-03T11:50:00',
      distanceKm: 1050, status: 'DELAYED', delayMinutes: 125,
      isEUDeparture: false, isEUDestination: true, isEUCarrier: true, regulationApplicable: true
    },
    {
      id: '2', flightNumber: 'LH1860', airline: 'Lufthansa', airlineCode: 'LH',
      departureAirport: 'FRA', departureCity: 'Frankfurt',
      arrivalAirport: 'MAD', arrivalCity: 'Madrid',
      scheduledDeparture: '2026-07-03T13:30:00', scheduledArrival: '2026-07-03T16:00:00',
      distanceKm: 1420, status: 'DEPARTED',
      isEUDeparture: true, isEUDestination: true, isEUCarrier: true, regulationApplicable: true
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
      const newFlight: Flight = {
        ...this.flightForm.value,
        id: Date.now().toString(),
        departureCity: this.flightForm.value.departureAirport,
        arrivalCity: this.flightForm.value.arrivalAirport,
        status: 'SCHEDULED',
        isEUDeparture: false, isEUDestination: true, isEUCarrier: true, regulationApplicable: true
      };
      this.flights.push(newFlight);
      this.flightForm.reset();
    }
  }

  selectFlight(flight: Flight) {
    this.selectedFlight = flight;
    this.flightEvents = this.getMockEvents(flight.id);
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