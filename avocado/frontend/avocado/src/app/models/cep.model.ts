export interface CepAlert {
  id: string;
  flightId: string;
  flightNumber: string;
  scenario: 'DELAY_ESCALATION' | 'CANCELLATION' | 'MISSED_CONNECTION' | 'THRESHOLD_CROSSING';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  title: string;
  message: string;
  triggeredAt: string;
  articleReference: string;
  rightsActivated: string[];
  recommendedAction: string;
  acknowledged: boolean;
}