import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  // NOT USED: WebSocket/CEP alerts not implemented
  // Backend WebSocket endpoint: WS /ws/alerts for real-time notifications
  // Would receive CepAlert events when flight status changes (delays, cancellations, etc)
}
