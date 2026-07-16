export interface DeptStat {
  department: string;
  count: number;
  attritionRate: number; // percentage (e.g. 12 means 12%)
  active: number;
  attrition: number;
}

export interface SalaryStat {
  tier: string;
  count: number;
  attritionRate: number;
}

export interface OvertimeStat {
  overtime: string;
  count: number;
  attritionRate: number;
}

export interface StressStat {
  level: string;
  count: number;
  attritionRate: number;
}

export interface WorkLifeStat {
  rating: string;
  count: number;
  attritionRate: number;
}

export interface AgeStat {
  range: string;
  count: number;
  attritionRate: number;
}

export interface CorrelationItem {
  feature: string;
  coefficient: number;
  impact: 'Positive' | 'Negative';
}

export const KPI_STATS = {
  totalEmployees: 10000,
  attritionRate: 16.4,
  avgAge: 41.2,
  avgIncome: 10854,
  avgYearsAtCompany: 7.2,
  activeEmployees: 8360,
  attritionCount: 1640
};

export const DEPT_STATS: DeptStat[] = [
  { department: 'Engineering', count: 3200, attritionRate: 12.0, active: 2816, attrition: 384 },
  { department: 'R&D', count: 2500, attritionRate: 10.2, active: 2245, attrition: 255 },
  { department: 'Sales', count: 2100, attritionRate: 25.1, active: 1573, attrition: 527 },
  { department: 'Marketing', count: 1400, attritionRate: 18.3, active: 1144, attrition: 256 },
  { department: 'HR', count: 800, attritionRate: 20.0, active: 640, attrition: 160 }
];

export const SALARY_STATS: SalaryStat[] = [
  { tier: '< $5k /mo', count: 2500, attritionRate: 31.8 },
  { tier: '$5k - $10k /mo', count: 4000, attritionRate: 15.2 },
  { tier: '$10k - $15k /mo', count: 2500, attritionRate: 8.4 },
  { tier: '$15k+ /mo', count: 1000, attritionRate: 3.8 }
];

export const OVERTIME_STATS: OvertimeStat[] = [
  { overtime: 'Required Overtime', count: 3000, attritionRate: 36.7 },
  { overtime: 'No Overtime', count: 7000, attritionRate: 7.7 }
];

export const STRESS_STATS: StressStat[] = [
  { level: 'Level 1: Low', count: 2500, attritionRate: 4.8 },
  { level: 'Level 2: Medium', count: 3500, attritionRate: 9.6 },
  { level: 'Level 3: High', count: 2500, attritionRate: 24.2 },
  { level: 'Level 4: Critical', count: 1500, attritionRate: 41.9 }
];

export const WORKLIFE_STATS: WorkLifeStat[] = [
  { rating: '1: Poor', count: 1200, attritionRate: 45.2 },
  { rating: '2: Fair', count: 2800, attritionRate: 22.1 },
  { rating: '3: Good', count: 4500, attritionRate: 10.4 },
  { rating: '4: Excellent', count: 1500, attritionRate: 5.8 }
];

export const AGE_STATS: AgeStat[] = [
  { range: '22 - 30', count: 2200, attritionRate: 27.5 },
  { range: '31 - 40', count: 3800, attritionRate: 15.8 },
  { range: '41 - 50', count: 2500, attritionRate: 11.2 },
  { range: '51 - 60', count: 1500, attritionRate: 7.9 }
];

export const CORRELATION_STATS: CorrelationItem[] = [
  { feature: 'Overtime Requirements', coefficient: 0.42, impact: 'Positive' },
  { feature: 'Stress Levels', coefficient: 0.38, impact: 'Positive' },
  { feature: 'Poor Work-Life Balance', coefficient: 0.35, impact: 'Positive' },
  { feature: 'Low Monthly Salary', coefficient: 0.30, impact: 'Positive' },
  { feature: 'Low Manager Evaluation', coefficient: 0.24, impact: 'Positive' },
  { feature: 'Low Job Satisfaction', coefficient: 0.22, impact: 'Positive' },
  { feature: 'Promotion In Last 2 Yrs', coefficient: -0.18, impact: 'Negative' },
  { feature: 'Remote Work Option', coefficient: -0.12, impact: 'Negative' },
  { feature: 'High Employee Health Score', coefficient: -0.10, impact: 'Negative' }
];

export const RECENT_INSIGHTS = [
  {
    id: 1,
    title: 'Sales Department Attrition Spike',
    description: 'Attrition in the Sales team has reached 25.1%, driven by higher Overtime frequencies (42% of Sales employees work Overtime).',
    category: 'Department Risk',
    severity: 'High',
    date: 'July 2026'
  },
  {
    id: 2,
    title: 'Work-Life Balance Interventions',
    description: 'Transitioning employees with Poor (1) Work-Life ratings to flexible hours has historical potential to reduce overall risk by 15%.',
    category: 'Retention Strategy',
    severity: 'Medium',
    date: 'June 2026'
  },
  {
    id: 3,
    title: 'Compensation Benchmark Gap',
    description: 'Employees earning below $5k/mo represent 31.8% of attrition. A general 8% basic pay adjustment for tier-1 staff is recommended.',
    category: 'Compensation',
    severity: 'High',
    date: 'May 2026'
  }
];
