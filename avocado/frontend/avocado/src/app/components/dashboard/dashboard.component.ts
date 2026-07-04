import { Component } from '@angular/core';
import { ScenarioService, Scenario } from '../../services/scenario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  scenarios: Scenario[];

  cepPresets = [
    { id: 'delay', name: 'CEP 1: Delay escalation', specRef: 'Table 5.1' },
    { id: 'cancellation', name: 'CEP 2: Cancellation detected', specRef: 'Table 5.2' },
    { id: 'ana', name: 'CEP 3: Missed connection (Ana)', specRef: 'Table 5.3 / §5' }
  ];

  constructor(scenarioService: ScenarioService) {
    this.scenarios = scenarioService.scenarios;
  }
}
