import React from 'react';
import { 
  Cpu, 
  HelpCircle, 
  Plus, 
  Minus, 
  BookOpen, 
  TrendingUp, 
  TrendingDown, 
  Lock 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';

import ChartCard from '../components/ChartCard';

const FEATURE_IMPORTANCE = [
  { name: 'Overtime Requirements', importance: 0.25, type: 'Negative Influence' },
  { name: 'Low Salary Compensation', importance: 0.20, type: 'Negative Influence' },
  { name: 'High Daily Stress Level', importance: 0.20, type: 'Negative Influence' },
  { name: 'Poor Work-Life Balance', importance: 0.15, type: 'Negative Influence' },
  { name: 'Low Direct Manager Rating', importance: 0.10, type: 'Negative Influence' },
  { name: 'Low Job Satisfaction', importance: 0.10, type: 'Negative Influence' },
  { name: 'Promotion In Last 2 Yrs', importance: -0.10, type: 'Positive Influence' },
  { name: 'High Health Score', importance: -0.05, type: 'Positive Influence' }
];

export default function Explain() {
  // Sort importance descending by absolute value
  const sortedImportance = [...FEATURE_IMPORTANCE].sort((a, b) => Math.abs(b.importance) - Math.abs(a.importance));

  return (
    <div className="space-y-6" id="explain-page-container">
      {/* Intro section */}
      <div>
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
          Explainable AI (XAI) & Model Transparency
        </span>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Model Interpretability Portal
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Understand which factors influence attrition risk and explore the math behind the serverless prediction scores.
        </p>
      </div>

      {/* Feature Importance Horizontal Chart */}
      <div id="feature-importance-section">
        <ChartCard 
          title="Global Feature Importance Weights" 
          description="How heavily the ML algorithm weighs individual parameters when determining flight probability"
        >
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={sortedImportance} 
                layout="vertical"
                margin={{ top: 10, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} domain={[-0.15, 0.3]} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} width={150} />
                <Tooltip 
                  formatter={(val: number) => [`${(val * 100).toFixed(0)}% Weight`, 'Influence']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="importance" barSize={16} radius={[0, 4, 4, 0]}>
                  {sortedImportance.map((entry, index) => {
                    const color = entry.importance > 0 ? '#ef4444' : '#10b981';
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* SHAP-Style Explanation Showcase */}
      <div 
        className="glass-card rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-sm space-y-6"
        id="shap-showcase-container"
      >
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Cpu className="h-5 w-5 text-indigo-500 animate-pulse" />
            SHAP (SHapley Additive exPlanations) Visual Model
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            A visual decomposition of how individual attributes drag an employee's flight probability score up or down.
          </p>
        </div>

        {/* Mock SHAP visual bar */}
        <div className="space-y-4" id="shap-visual-bar">
          <div className="flex justify-between text-xs font-semibold text-slate-400">
            <span>Base Probability (15.0%)</span>
            <span>Target Probability (65.0%)</span>
          </div>

          {/* Interactive Bar */}
          <div className="relative h-12 w-full rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/50 overflow-hidden flex">
            {/* base stay segment (15%) */}
            <div className="h-full bg-slate-300 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-400" style={{ width: '15%' }}>
              Base: 15%
            </div>
            {/* Overtime push (+25%) */}
            <div className="h-full bg-rose-500/20 dark:bg-rose-950/40 border-r border-rose-500/30 flex items-center justify-center text-[9px] font-bold text-rose-700 dark:text-rose-400" style={{ width: '25%' }}>
              Overtime +25%
            </div>
            {/* High stress push (+20%) */}
            <div className="h-full bg-rose-500/15 dark:bg-rose-950/30 border-r border-rose-500/20 flex items-center justify-center text-[9px] font-bold text-rose-600 dark:text-rose-400" style={{ width: '20%' }}>
              Stress +20%
            </div>
            {/* Poor work life push (+15%) */}
            <div className="h-full bg-rose-500/10 dark:bg-rose-950/20 border-r border-rose-500/10 flex items-center justify-center text-[9px] font-bold text-rose-600 dark:text-rose-400" style={{ width: '15%' }}>
              WLB +15%
            </div>
            {/* Promotion reduction (-10%) */}
            <div className="h-full bg-emerald-500/15 dark:bg-emerald-950/20 border-r border-emerald-500/20 flex items-center justify-center text-[9px] font-bold text-emerald-700 dark:text-emerald-400" style={{ width: '10%' }}>
              Promo -10%
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-rose-500" /> Red weights push probability higher (Higher Attrition Risk)
            </span>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-emerald-500" /> Green weights pull probability lower (Higher Stability)
            </span>
          </div>
        </div>

        {/* Detailed Explanation Guides */}
        <div className="grid gap-6 sm:grid-cols-2 pt-4 border-t border-slate-100 dark:border-slate-800" id="shap-explanations-grid">
          <div className="space-y-2 bg-slate-50 dark:bg-slate-900/40 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <Plus className="h-4 w-4" />
              <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                Primary Attrition Accelerators
              </h4>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2 leading-relaxed">
              <li><strong>Mandatory Overtime:</strong> Pushes flight risk score up by 25%. Represents a major systemic burnout factor across high-growth sales or engineering teams.</li>
              <li><strong>Low Base Salary:</strong> Pushes flight risk score up by 20%. Triggered when the basic monthly income falls below $5,000 threshold, signaling compensation dissatisfaction.</li>
              <li><strong>Workplace Stress Level:</strong> Stress values of 3 (High) or 4 (Critical) add 20% to the probability metric instantly.</li>
            </ul>
          </div>

          <div className="space-y-2 bg-slate-50 dark:bg-slate-900/40 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Minus className="h-4 w-4" />
              <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                Primary Retention Pillars
              </h4>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2 leading-relaxed">
              <li><strong>Recent Career Promotion:</strong> A vertical promotion step in the last 2 years deducts 10% from the attrition probability. Re-establishes a strong perception of upward mobility.</li>
              <li><strong>Physical/Mental Well-Being:</strong> High personal well-being indices (4 or 5) subtract 5% from individual scores.</li>
              <li><strong>Remote Work Accommodation:</strong> Providing remote or hybrid flexibilities acts as a stabilizer, subtracting 5% from base risk.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* AI Ethics and Policy Accordion */}
      <div 
        className="glass-card rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-sm space-y-3"
        id="ethics-policy-container"
      >
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <BookOpen className="h-5 w-5" />
          <h4 className="font-semibold text-sm sm:text-base text-slate-800 dark:text-white">
            Ethical Governance & Anti-Bias Standards
          </h4>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          PulseHR adheres strictly to workforce fairness modeling. The predictive attrition model **explicitly excludes** protected demographic parameters such as gender, race, religious affiliation, or national origin to ensure absolute structural parity and prevent decision biases in automated HR suggestions.
        </p>
      </div>
    </div>
  );
}
