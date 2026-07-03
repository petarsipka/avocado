export type ComplaintStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'AIRLINE_RESPONDED' | 'ESCALATED_TO_AUTHORITY' | 'RESOLVED' | 'REJECTED';

export interface ComplaintEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'ACTION' | 'DEADLINE' | 'ALERT' | 'ESCALATION' | 'MILESTONE';
  completed: boolean;
}

export interface EvidenceItem {
  id: string;
  type: 'BOARDING_PASS' | 'FLIGHT_STATUS_SCREENSHOT' | 'CANCELLATION_NOTICE' | 'RECEIPT_FOOD' | 'RECEIPT_HOTEL' | 'RECEIPT_TRANSPORT' | 'EMAIL_CORRESPONDENCE' | 'SMS_NOTIFICATION' | 'VOUCHER_OFFER' | 'ALTERNATIVE_FLIGHT_TICKET' | 'OTHER';
  description: string;
  importance: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  collected: boolean;
  fileName?: string;
  fileUrl?: string;
  uploadDate?: string;
}

export interface ComplaintProcess {
  id: string;
  incidentId: string;
  flightId: string;
  airline: string;
  status: ComplaintStatus;
  submittedAt?: string;
  airlineResponseDeadline?: string;
  escalationDeadline?: string;
  statuteOfLimitations?: string;
  currentStep: number;
  totalSteps: number;
  events: ComplaintEvent[];
  evidence: EvidenceItem[];
  recommendedAuthority?: string;
  recommendedAuthorityUrl?: string;
  notes: string;
}