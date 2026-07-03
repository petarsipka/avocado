import { Component } from '@angular/core';
import { CepAlert } from '../../models/cep.model';

@Component({
  selector: 'app-notification-panel',
  template: `
    <div class="notification-panel">
      <h3>CEP Alerts ({{ alerts.length }})</h3>
      <div *ngFor="let alert of alerts" class="alert-card" [class.critical]="alert.severity === 'CRITICAL'">
        <strong>{{ alert.title }}</strong>
        <p>{{ alert.message }}</p>
        <small>{{ alert.articleReference }}</small>
        <button mat-button (click)="acknowledge(alert.id)">Acknowledge</button>
      </div>
    </div>
  `,
  styles: [`
    .notification-panel { padding: 16px; min-width: 350px; }
    .alert-card { padding: 12px; margin-bottom: 8px; border-radius: 4px; background: #fff3e0; }
    .alert-card.critical { background: #ffebee; border-left: 4px solid #c62828; }
  `]
})
export class NotificationPanelComponent {
  alerts: CepAlert[] = [
    {
      id: 'cep-1', flightId: '1', flightNumber: 'LH1411',
      scenario: 'DELAY_ESCALATION', severity: 'CRITICAL',
      title: 'Delay Escalation: 125 minutes',
      message: 'Flight LH1411 delay exceeded 2h (care rights) and 3h (compensation threshold).',
      triggeredAt: '2026-07-03T12:15:00',
      articleReference: 'Art. 7, Art. 9',
      rightsActivated: ['Financial Compensation', 'Food & Drink'],
      recommendedAction: 'Document delay, prepare compensation claim',
      acknowledged: false
    }
  ];

  acknowledge(id: string) {
    this.alerts = this.alerts.filter(a => a.id !== id);
  }
}