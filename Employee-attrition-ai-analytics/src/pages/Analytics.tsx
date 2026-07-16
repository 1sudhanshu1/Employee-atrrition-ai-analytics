import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  ComposedChart
} from 'recharts';
import { 
  BarChart2, 
  Compass, 
  ShieldAlert, 
  Zap, 
  Percent,
  CheckCircle2
} from 'lucide-react';

import ChartCard from '../components/ChartCard';
import { 
  DEPT_STATS, 
  SALARY_STATS, 
  OVERTIME_STATS, 
  STRESS_STATS, 
  WORKLIFE_STATS, 
  AGE_STATS, 
  CORRELATION_STATS 
} from '../utils/analyticsData';

export default function Analytics() {
  // Sort correlations by value to display them in descending order of strength
  const sortedCorrelations = [...CORRELATION_STATS].sort((a, b) => Math.abs(b.coefficient) - Math.abs(a.coefficient));

  return (
    <div className="space-y-6" id="analytics-page-container">
      {/* Intro section */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            Workforce Structural Diagnostics
          </span>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Retrospective HR Metrics
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Audit historic structural correlations across 10,000 synthesized worker nodes.
          </p>
        </div>
      </div>

      {/* Feature Correlation Bar Chart (Main Technical Visual) */}
      <div id="correlation-section">
        <ChartCard 
          title="Statistical Correlation with Employee Attrition" 
          description="Measures linear correlation weight (Pearson coefficient) of individual parameters with attrition probability."
        >
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={sortedCorrelations} 
                layout="vertical"
                margin={{ top: 10, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" domain={[-0.3, 0.5]} stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis dataKey="feature" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} width={150} />
                <Tooltip 
                  formatter={(val: number) => [`${(val * 100).toFixed(0)}% Intensity`, 'Correlation Strength']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar 
                  dataKey="coefficient" 
                  radius={[0, 4, 4, 0]}
                  barSize={18}
                >
                  {sortedCorrelations.map((entry, index) => {
                    const color = entry.coefficient > 0 ? '#ef4444' : '#10b981'; // positive correlation is red (increases attrition), negative is green (decreases attrition)
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 p-4 border border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap gap-x-6 gap-y-2">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded bg-rose-500" />
              <span><strong>Positive Correlation (+):</strong> Increases likelihood of employee attrition (e.g., Overtime requirements, High Stress).</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded bg-emerald-500" />
              <span><strong>Negative Correlation (-):</strong> Decreases likelihood of attrition, serving as retention pillars (e.g., Promotions, Health).</span>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Grid of Demographics and Job factors */}
      <div className="grid gap-6 md:grid-cols-2" id="demographics-grid">
        {/* Attrition by Salary Tiers */}
        <ChartCard 
          title="Attrition Distribution by Monthly Income" 
          description="Attrition intensity vs average salary cohorts"
        >
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALARY_STATS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="tier" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  formatter={(val: number) => [`${val}% Attrition`, 'Attrition Rate']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="attritionRate" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Attrition by Overtime */}
        <ChartCard 
          title="Attrition Rate by Overtime Mandates" 
          description="Visual comparison of turnover between required overtime and normal working hours"
        >
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={OVERTIME_STATS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="overtime" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  formatter={(val: number) => [`${val}% Attrition`, 'Attrition Rate']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="attritionRate" radius={[4, 4, 0, 0]} barSize={40}>
                  <Cell fill="#ef4444" />
                  <Cell fill="#10b981" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Attrition by Age Cohorts */}
        <ChartCard 
          title="Workforce Age Cohort Exit Rates" 
          description="Analyzing how life stages and generational cohorts impact attrition"
        >
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={AGE_STATS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="range" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  formatter={(val: number) => [`${val}% Attrition`, 'Attrition Rate']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line type="monotone" dataKey="attritionRate" stroke="#ec4899" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Attrition by Stress Levels */}
        <ChartCard 
          title="Work Stress vs. Operational Burnout" 
          description="Higher stress environments act as immediate catalysts for resignations"
        >
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={STRESS_STATS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="level" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  formatter={(val: number) => [`${val}% Attrition`, 'Attrition Rate']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="attritionRate" radius={[4, 4, 0, 0]} barSize={30}>
                  <Cell fill="#10b981" />
                  <Cell fill="#3b82f6" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#ef4444" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Work Life Balance analysis */}
        <ChartCard 
          title="Work-Life Balance Satisfaction Exit Weights" 
          description="Retention ratios indexed directly to reported personal balance indices"
        >
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WORKLIFE_STATS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWlb" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="rating" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  formatter={(val: number) => [`${val}% Attrition`, 'Attrition Rate']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="attritionRate" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorWlb)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Department detailed bar breakdown */}
        <ChartCard 
          title="Operational Capacity by Department" 
          description="Proportion of Active vs. Attrited employees per department category"
        >
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DEPT_STATS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="department" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="active" name="Active Staff" stackId="a" fill="#4f46e5" barSize={35} />
                <Bar dataKey="attrition" name="Attrition" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
