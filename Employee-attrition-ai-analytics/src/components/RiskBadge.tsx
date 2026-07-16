import React from 'react';

interface RiskBadgeProps {
  level: 'Low' | 'Medium' | 'High';
}

export default function RiskBadge({ level }: RiskBadgeProps) {
  const styles = {
    Low: {
      text: 'text-emerald-700 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200/50 dark:border-emerald-800/40',
      dot: 'bg-emerald-500'
    },
    Medium: {
      text: 'text-amber-700 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200/50 dark:border-amber-800/40',
      dot: 'bg-amber-500'
    },
    High: {
      text: 'text-rose-700 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/30 border-rose-200/50 dark:border-rose-800/40',
      dot: 'bg-rose-500'
    }
  };

  const current = styles[level] || styles.Low;

  return (
    <span 
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${current.text} ${current.bg}`}
      id={`risk-badge-${level.toLowerCase()}`}
    >
      <span className={`h-2 w-2 rounded-full ${current.dot} animate-pulse`} />
      {level} Attrition Risk
    </span>
  );
}
