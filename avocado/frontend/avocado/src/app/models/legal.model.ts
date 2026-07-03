export interface RuleTrace {
  ruleId: string;
  ruleName: string;
  level: 1 | 2 | 3 | 4;
  condition: string;
  action: string;
  articleReference: string;
  fired: boolean;
  timestamp: string;
}

/** Backend Compensation from Drools rules */
export interface Compensation {
  article: string;      // from backend
  amountEur: number;    // from backend (replaces amount)
  explanation: string;  // from backend (replaces reason)
}

/** Backend Right with RightType enum from Drools rules */
export type RightType = 'CARE_MEALS' | 'CARE_PHONE' | 'HOTEL' | 'HOTEL_TRANSPORT' | 'REFUND' | 'REROUTING' | 'ALTERNATIVE_FLIGHT' | 'COMPENSATION' | 'CARE_PRIORITY';

export interface Right {
  type: RightType;      // from backend
  article: string;      // from backend
  description: string;  // from backend
}

/** Extended Right for UI display */
export interface CareRight extends Right {
  activatedAtDelayMinutes?: number; // for display only
}

export interface RerouteRight extends Right {
  deadline?: string; // for display only
}

/** Backend Advice from Drools rules */
export interface Advice {
  title: string;
  description: string;
  category: string;
  articleReference?: string;
  priority?: number;
  actionRequired?: boolean;
  deadline?: string;
}

/** Backend response from /api/incident */
export interface LegalResultResponse {
  compensations: Compensation[];
  rights: Right[];
  advice: Advice[];
}

/** Extended downgrade info for UI display */
export interface DowngradeRefund {
  applicable: boolean;
  percentage: number;
  amount: number;
  article: string;
}

export interface StrategicAdvice {
  priority: number;
  category: 'IMMEDIATE' | 'PROCEDURAL' | 'EVIDENCE' | 'LONG_TERM';
  title: string;
  description: string;
  articleReference: string;
  actionRequired: boolean;
  deadline?: string;
}

export interface LegalQualification {
  id: string;
  incidentId: string;
  regulationApplicable: boolean;
  applicableArticles: string[];
  incidentType: string;
  distanceCategory: string;
  compensation: Compensation;
  careRights: CareRight[];
  rerouteRights: RerouteRight[];
  downgradeRefund?: DowngradeRefund;
  extraordinaryCircumstance: boolean;
  strategicAdvice: StrategicAdvice[];
  ruleTrace: RuleTrace[];
  overallConfidence: number;
}