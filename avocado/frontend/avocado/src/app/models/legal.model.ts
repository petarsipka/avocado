/** Backend Compensation output fact */
export interface Compensation {
  article: string;
  amountEur: number;
  explanation: string;
}

/** Matches backend RightType enum */
export type RightType =
  | 'CARE_MEALS' | 'CARE_PHONE' | 'HOTEL' | 'HOTEL_TRANSPORT'
  | 'REFUND' | 'REROUTING' | 'ALTERNATIVE_FLIGHT' | 'COMPENSATION' | 'CARE_PRIORITY';

/** Backend Right output fact */
export interface Right {
  type: RightType;
  article: string;
  description: string;
}

/** Backend Advice output fact */
export interface Advice {
  text: string;
  article: string;
}

/** Response from POST /api/incident */
export interface LegalResultResponse {
  regulationApplicable: boolean;
  distanceCategory: string | null;
  compensations: Compensation[];
  rights: Right[];
  advice: Advice[];
}

/** Single backward-chaining condition check */
export interface ConditionResult {
  label: string;
  satisfied: boolean;
}

/** Response from POST /api/question */
export interface QuestionResponse {
  goal: string;
  satisfied: boolean;
  conditions: ConditionResult[];
}
