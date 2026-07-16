export interface PredictionInput {
  age: number;
  department: string;
  jobRole: string;
  monthlyIncome: number;
  yearsAtCompany: number;
  overTime: 'Yes' | 'No';
  stressLevel: number;
  workLifeBalance: number;
  managerRating: number;
  promotionInLast2Years: 'Yes' | 'No';
  healthScore: number;
  remoteWork: 'Yes' | 'No';
  jobSatisfaction: number;
  envSatisfaction: number;
}

export interface FeatureWeight {
  name: string;
  weight: number;
}

export interface PredictionResult {
  prediction: 'Likely to Stay' | 'Likely to Leave';
  probability: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  recommendations: string[];
  featureWeights: FeatureWeight[];
}

export async function predictAttrition(data: PredictionInput): Promise<PredictionResult> {
  const response = await fetch('/api/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Prediction failed');
  }

  return response.json();
}
