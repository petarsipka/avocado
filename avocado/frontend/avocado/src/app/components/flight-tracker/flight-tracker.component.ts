import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Flight, FlightStatus } from '../../models/flight.model';
import { CepResult } from '../../models/cep.model';
import { ReasoningService } from '../../services/reasoning.service';
import { ScenarioService, Scenario } from '../../services/scenario.service';

interface EventRow {
  flightId: string;
  status: FlightStatus;
  minutesAfterStart: number;
  delayMinutes: number;
}

interface Preset {
  id: string;
  name: string;
  specRef: string;
  description: string;
}

@Component({
  selector: 'app-flight-tracker',
  templateUrl: './flight-tracker.component.html',
  styleUrls: ['./flight-tracker.component.css']
})
export class FlightTrackerComponent implements OnInit {

  presets: Preset[] = [
    {
      id: 'delay', name: 'CEP 1: Delay escalation', specRef: 'Spec Table 5.1',
      description: 'LH1411 (medium distance) delayed 190 min - crosses the 2h and 3h thresholds, care and compensation notifications fire.'
    },
    {
      id: 'cancellation', name: 'CEP 2: Cancellation detected', specRef: 'Spec Table 5.2',
      description: 'IB3151 goes from ON_TIME to CANCELLED - the pattern triggers an Art. 5 assessment notification.'
    },
    {
      id: 'ana', name: 'CEP 3: Missed connection (Ana)', specRef: 'Spec Table 5.3 / §5',
      description: 'LH1411 lands after LH1860 departed (same reservation R1) - missed connection detected per Folkerts C-11/11.'
    }
  ];

  statuses: FlightStatus[] = ['ON_TIME', 'DELAYED', 'CANCELLED', 'DEPARTED', 'LANDED'];
  scenarios: Scenario[];
  selectedFlightIds: string[] = [];
  events: EventRow[] = [];

  result?: CepResult;
  activePresetName = '';
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private reasoningService: ReasoningService,
    public scenarioService: ScenarioService
  ) {
    this.scenarios = this.scenarioService.scenarios;
  }

  ngOnInit() {
    const preset = this.route.snapshot.queryParamMap.get('preset');
    if (preset) {
      this.runPreset(preset);
    }
  }

  runPreset(id: string) {
    const preset = this.presets.find(p => p.id === id);
    this.activePresetName = preset ? preset.name : id;
    this.loading = true;
    this.error = '';
    this.result = undefined;

    this.reasoningService.simulatePreset(id).subscribe({
      next: (result) => {
        this.result = result;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Backend request failed. Is the backend running on port 8080?';
        this.loading = false;
        console.error('[FlightTracker] preset failed', err);
      }
    });
  }

  addEvent() {
    const firstFlight = this.selectedFlightIds[0] || this.scenarios[0].flight.flightId;
    this.events.push({ flightId: firstFlight, status: 'DELAYED', minutesAfterStart: 60, delayMinutes: 120 });
  }

  removeEvent(index: number) {
    this.events.splice(index, 1);
  }

  runCustom() {
    if (!this.selectedFlightIds.length || !this.events.length) return;

    const flights: Flight[] = this.selectedFlightIds
      .map(id => this.scenarios.find(s => s.flight.flightId === id))
      .filter((s): s is Scenario => !!s)
      .map(s => ({ ...s.flight, distanceCategory: this.categoryFor(s.flight.flightDistanceKm, s.flight.isWithinEu) }));

    const reservationId = 'R-CUSTOM';
    const data = {
      flights: flights.map(f => ({ ...f, reservationId })),
      events: this.events.map(e => ({
        flightId: e.flightId,
        status: e.status,
        timestamp: e.minutesAfterStart * 60000,
        delayMinutes: Number(e.delayMinutes),
        reservationId
      }))
    };

    this.activePresetName = 'Custom simulation';
    this.loading = true;
    this.error = '';
    this.result = undefined;

    this.reasoningService.simulateCustom(data).subscribe({
      next: (result) => {
        this.result = result;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Backend request failed. Is the backend running on port 8080?';
        this.loading = false;
        console.error('[FlightTracker] custom simulation failed', err);
      }
    });
  }

  private categoryFor(km: number, withinEu: boolean): 'SHORT' | 'MEDIUM' | 'LONG' {
    if (km <= 1500) return 'SHORT';
    if (withinEu || km <= 3500) return 'MEDIUM';
    return 'LONG';
  }
}
