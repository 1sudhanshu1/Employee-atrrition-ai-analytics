import React from 'react';

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export default function ChartCard({ title, description, children, actions }: ChartCardProps) {
  return (
    <div 
      className="glass-card flex flex-col rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-sm"
      id={`chart-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="font-display font-bold text-slate-800 dark:text-slate-100">
            {title}
          </h4>
          {description && (
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {actions}
          </div>
        )}
      </div>
      
      <div className="mt-6 flex-1 min-h-[300px] w-full" id={`chart-body-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        {children}
      </div>
    </div>
  );
}
