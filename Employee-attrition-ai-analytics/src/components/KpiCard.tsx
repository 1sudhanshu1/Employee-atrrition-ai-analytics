import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean; // positive is typically green, negative is red (or vice versa for attrition!)
    isNeutral?: boolean;
  };
  colorClass?: string;
}

export default function KpiCard({ title, value, subtext, icon: Icon, trend, colorClass = "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40" }: KpiCardProps) {
  return (
    <div 
      className="glass-card rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50 hover:shadow-md transition-all duration-200"
      id={`kpi-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div className={`rounded-xl p-2.5 ${colorClass}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
          {value}
        </h3>
        
        {(trend || subtext) && (
          <div className="mt-2 flex items-center gap-2">
            {trend && (
              <span 
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  trend.isNeutral
                    ? 'text-slate-500 bg-slate-100 dark:bg-slate-800'
                    : trend.isPositive
                    ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30'
                    : 'text-rose-600 bg-rose-50 dark:bg-rose-950/30'
                }`}
              >
                {trend.value}
              </span>
            )}
            {subtext && (
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {subtext}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
