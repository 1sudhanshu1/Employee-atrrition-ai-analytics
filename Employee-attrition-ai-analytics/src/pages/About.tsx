import React from 'react';
import { 
  Info, 
  Layers, 
  Cpu, 
  Github, 
  FileText, 
  Cloud, 
  Heart,
  ExternalLink
} from 'lucide-react';

export default function About() {
  const authorEmail = "sudhanshunikam1@gmail.com";

  const techStack = [
    { category: 'Frontend framework', list: 'React (v19) • TypeScript • Vite • Tailwind CSS (v4)' },
    { category: 'Visual analytics', list: 'Recharts (Responsive SVG visualizer) • Lucide React icons' },
    { category: 'Serverless backend', list: 'Netlify Functions (Node.js runtime, zero-cold start optimization)' },
    { category: 'Interactions & animation', list: 'Framer Motion (smooth sidebar transitions and fading state changes)' }
  ];

  return (
    <div className="space-y-6" id="about-page-container">
      {/* Page Header */}
      <div>
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
          System Information & Architecture
        </span>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          About PulseHR Analytics
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Review the tech stack, serverless execution blueprint, and engineering credits behind the platform.
        </p>
      </div>

      {/* Grid: Workflow diagram and Stack breakdown */}
      <div className="grid gap-6 md:grid-cols-12" id="about-grid-row">
        {/* Architecture flow card */}
        <div className="md:col-span-7 space-y-6">
          <div className="glass-card rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-indigo-500" />
              Netlify Serverless Deployment Architecture
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              PulseHR is engineered using a highly performant **Serverless Architecture** to ensure fast loading times, cost efficiency, and instant scalability.
            </p>

            {/* Architecture diagram steps */}
            <div className="space-y-3 pt-2" id="architecture-blueprint">
              <div className="flex gap-4 items-start">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold dark:bg-indigo-950/40 dark:text-indigo-400">1</div>
                <div>
                  <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-200">Vite-Built Client-Side SPA</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">The lightweight React client is built into static optimized bundle chunks located in the `dist/` directory, hosted and fast-served directly from Netlify's high-speed global Edge CDN network.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold dark:bg-indigo-950/40 dark:text-indigo-400">2</div>
                <div>
                  <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-200">`/api/predict` Redirection Routing</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">As specified inside the custom `netlify.toml` routing rules, requests to `/api/predict` are proxy-forwarded seamlessly without CORS overhead directly to Netlify's backend serverless functions.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold dark:bg-indigo-950/40 dark:text-indigo-400">3</div>
                <div>
                  <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-200">Serverless Function ML Computation</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">`netlify/functions/predict.js` boots dynamically, processes the JSON input, calculates attrition hazard weights on AWS Lambda, compiles remediation strategies, and responds instantly with structured, JSON-formatted diagnostics.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technology stack card */}
          <div className="glass-card rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Cpu className="h-5 w-5 text-indigo-500" />
              Technology Stack Specifications
            </h3>
            
            <div className="divide-y divide-slate-100 dark:divide-slate-800" id="tech-stack-breakdown">
              {techStack.map((tech, i) => (
                <div key={i} className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 sm:w-1/3">
                    {tech.category}
                  </span>
                  <span className="text-xs text-slate-700 dark:text-slate-300 sm:w-2/3">
                    {tech.list}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side: Author card */}
        <div className="md:col-span-5 flex flex-col h-full">
          <div 
            className="glass-card rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-sm text-center flex flex-col justify-between flex-1 min-h-[350px]"
            id="author-card-container"
          >
            <div className="space-y-4 py-4">
              {/* Profile Avatar placeholder */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-display text-2xl font-bold shadow-md shadow-indigo-500/25">
                SN
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-slate-800 dark:text-white">
                  Sudhanshu Nikam
                </h3>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider">
                  Lead Developer & Data Scientist
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {authorEmail}
                </p>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                Specialized in architecting high-performance web systems, ML workflows, and responsive data analytics dashboards.
              </p>
            </div>

            {/* Actions / Portfolio hooks */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-4 space-y-2.5">
              <a 
                href={`mailto:${authorEmail}`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white py-2.5 transition-all"
                id="author-contact-btn"
              >
                Inquire and Connect
              </a>
              <div className="flex gap-2.5">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 text-[11px] font-semibold text-slate-600 dark:text-slate-300 py-2 transition-all"
                  id="author-github-btn"
                >
                  <Github className="h-3.5 w-3.5" /> GitHub Profile
                </a>
                <a 
                  href="https://netlify.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 text-[11px] font-semibold text-slate-600 dark:text-slate-300 py-2 transition-all"
                  id="author-netlify-btn"
                >
                  <Cloud className="h-3.5 w-3.5" /> Deploy Netlify
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
