export interface BackwardChainGoal {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface BackwardChainCondition {
  id: string;
  description: string;
  articleReference: string;
  satisfied: boolean;
  userAnswer?: boolean;
  evidence?: string;
  subConditions?: BackwardChainCondition[];
}

export interface BackwardChainResult {
  goalId: string;
  goalName: string;
  achievable: boolean;
  confidence: number;
  conclusion: string;
  articleReference: string;
  conditions: BackwardChainCondition[];
  missingFacts: string[];
  nextSteps: string;
  ruleTrace: string[];
}