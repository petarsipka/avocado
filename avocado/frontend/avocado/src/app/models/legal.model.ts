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

export interface Compensation {
  applicable: boolean;
  amount: number;
  currency: string;
  article: string;
  distanceCategory: string;
  reducedBy50Percent: boolean;
  reason: string;
}

export interface CareRight {
  type: 'FOOD_DRINK' | 'PHONE_CALLS' | 'HOTEL' | 'TRANSPORT';
  applicable: boolean;
  article: string;
  description: string;
  activatedAtDelayMinutes?: number;
}

export interface RerouteRight {
  type: 'REFUND' | 'REROUTE';
  applicable: boolean;
  article: string;
  description: string;
  deadline?: string;
}

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