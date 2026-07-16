import React from 'react';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  AlertTriangle,
  Briefcase,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

import KpiCard from '../components/KpiCard';
import ChartCard from '../components/ChartCard';
import { KPI_STATS, DEPT_STATS, RECENT_INSIGHTS } from '../utils/analyticsData';

export default function Home() {
  const navigate = useNavigate();

  // Pie chart data: Active vs Left
  const headCountData = [
    { name: 'Active Employees', value: KPI_STATS.activeEmployees, color: '#6366f1' }, // Indigo 500
    { name: 'Attrited Employees', value: KPI_STATS.attritionCount, color: '#f43f5e' }  // Rose 500
  ];

  // Bar chart data for Departments: Count and Attrition rate
  const deptData = DEPT_STATS.map(d => ({
    name: d.department,
    'Total Headcount': d.count,
    'Attrition Rate (%)': d.attritionRate
  }));

  return (
    <div className="space-y-6" id="home-page-container">
      {/* Hero Welcome Banner */}
      <div 
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-lg md:p-8"
        id="dashboard-hero"
      >
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="inline-block rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-md">
            Workforce Intelligence Powered by Serverless AI
          </span>
          <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl text-white">
            Operationalize Attrition Prevention
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Monitor critical organizational risk factors, predict flight risks of key individual contributors on serverless runtimes, and execute target-oriented HR initiatives.
          </p>
          <div className="pt-3">
            <button
              onClick={() => navigate('/prediction')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 hover:shadow-indigo-500/20 active:scale-[0.98] transition-all"
              id="hero-predict-btn"
            >
              Analyze Employee Flight Risk <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        {/* Abstract decorative graphic */}
        <div className="absolute right-0 top-0 -mr-16 -mt-16 hidden h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl lg:block" />
        <div className="absolute bottom-0 right-1/4 -mb-16 -mr-16 hidden h-48 w-48 rounded-full bg-violet-500/10 blur-2xl lg:block" />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" id="kpi-grid">
        <KpiCard
          title="Total Workforce Size"
          value={KPI_STATS.totalEmployees.toLocaleString()}
          subtext="across 5 departments"
          icon={Users}
          trend={{ value: "Stable (+1.2%)", isPositive: true, isNeutral: true }}
          colorClass="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900/30"
        />
        <KpiCard
          title="Overall Attrition Rate"
          value={`${KPI_STATS.attritionRate}%`}
          subtext="benchmark: 15.0%"
          icon={TrendingUp}
          trend={{ value: "+1.4% MoM", isPositive: false }}
          colorClass="text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border-rose-100 dark:border-rose-900/30"
        />
        <KpiCard
          title="Average Salary"
          value={`$${KPI_STATS.avgIncome.toLocaleString()}/mo`}
          subtext="industry median: $9.8k"
          icon={DollarSign}
          trend={{ value: "+4.6% vs Market", isPositive: true }}
          colorClass="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/30"
        />
        <KpiCard
          title="Avg Company Tenure"
          value={`${KPI_STATS.avgYearsAtCompany} Years`}
          subtext="healthy rotation level"
          icon={Clock}
          trend={{ value: "-0.2 Yrs Variance", isPositive: true, isNeutral: true }}
          colorClass="text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 border-violet-100 dark:border-violet-900/30"
        />
      </div>

      {/* Core Attrition Distribution Overview Charts */}
      <div className="grid gap-6 lg:grid-cols-5" id="charts-overview-row">
        {/* Headcount ratio donut chart */}
        <div className="lg:col-span-2">
          <ChartCard 
            title="Workforce Stability Ratio" 
            description="Overall proportion of active vs. attrited employees"
          >
            <div className="flex flex-col items-center justify-center h-[260px]">
              <div className="relative w-full h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={headCountData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {headCountData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(val: number) => [val.toLocaleString(), 'Employees']}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Embedded Donut text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-display font-extrabold text-slate-800 dark:text-white">
                    {KPI_STATS.attritionRate}%
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Attrition Rate
                  </span>
                </div>
              </div>
              
              {/* Legend labels */}
              <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
                {headCountData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600 dark:text-slate-300 font-medium">
                      {item.name}: {((item.value / KPI_STATS.totalEmployees) * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Department chart */}
        <div className="lg:col-span-3">
          <ChartCard 
            title="Department Performance & Flight Rates" 
            description="Compare workforce volumes alongside respective attrition percentages"
          >
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis yAxisId="left" stroke="#6366f1" fontSize={11} tickLine={false} axisLine={false} label={{ value: 'Headcount', angle: -90, position: 'insideLeft', style: { fill: '#6366f1', fontSize: 10, fontWeight: 500 } }} />
                  <YAxis yAxisId="right" orientation="right" stroke="#f43f5e" fontSize={11} tickLine={false} axisLine={false} label={{ value: 'Attrition Rate (%)', angle: 90, position: 'insideRight', style: { fill: '#f43f5e', fontSize: 10, fontWeight: 500 } }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: 11 }} />
                  <Bar yAxisId="left" dataKey="Total Headcount" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={25} />
                  <Bar yAxisId="right" dataKey="Attrition Rate (%)" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={25} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Recent HR Insights Section */}
      <div 
        className="glass-card rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-sm"
        id="recent-insights-container"
      >
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h3 className="font-display font-bold text-slate-800 dark:text-white">
              Critical Workforce Insights & Actions
            </h3>
          </div>
          <button 
            onClick={() => navigate('/analytics')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
            id="view-analytics-shortcut-btn"
          >
            Explore Detailed Analytics <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-850" id="insights-list">
          {RECENT_INSIGHTS.map((insight) => (
            <div 
              key={insight.id} 
              className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              id={`insight-item-${insight.id}`}
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    insight.severity === 'High' 
                      ? 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/20' 
                      : 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/20'
                  }`}>
                    {insight.severity} Severity
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {insight.category} • {insight.date}
                  </span>
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm sm:text-base">
                  {insight.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-4xl">
                  {insight.description}
                </p>
              </div>
              <button
                onClick={() => navigate('/prediction')}
                className="self-start sm:self-center shrink-0 text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 border border-indigo-100 hover:border-indigo-200 dark:border-indigo-900/40 dark:hover:border-indigo-800 rounded-lg px-3 py-1.5 transition-all"
                id={`insight-btn-action-${insight.id}`}
              >
                Simulate Mitigations
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
