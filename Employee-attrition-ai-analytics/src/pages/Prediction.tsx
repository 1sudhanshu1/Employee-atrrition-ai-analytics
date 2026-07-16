import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  BookOpen,
  ArrowRight
} from 'lucide-react';

import { predictAttrition, PredictionInput, PredictionResult } from '../utils/api';
import RiskBadge from '../components/RiskBadge';
import LoadingSpinner from '../components/LoadingSpinner';

const DEPARTMENTS = ['Sales', 'R&D', 'Engineering', 'HR', 'Marketing'];
const ROLES_BY_DEPT: { [key: string]: string[] } = {
  'Sales': ['Sales Executive', 'Account Manager', 'Sales Representative'],
  'R&D': ['Research Scientist', 'Lab Technician', 'R&D Director'],
  'Engineering': ['Software Engineer', 'QA Engineer', 'DevOps Specialist', 'Tech Lead'],
  'HR': ['HR Specialist', 'HR Manager'],
  'Marketing': ['Marketing Specialist', 'Brand Manager']
};

export default function Prediction() {
  const [formData, setFormData] = useState<PredictionInput>({
    age: 32,
    department: 'Engineering',
    jobRole: 'Software Engineer',
    monthlyIncome: 6500,
    yearsAtCompany: 3,
    overTime: 'No',
    stressLevel: 2,
    workLifeBalance: 3,
    managerRating: 3,
    promotionInLast2Years: 'No',
    healthScore: 3,
    remoteWork: 'Yes',
    jobSatisfaction: 3,
    envSatisfaction: 3
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sync job role list when department changes
  useEffect(() => {
    const roles = ROLES_BY_DEPT[formData.department] || [];
    if (!roles.includes(formData.jobRole)) {
      setFormData(prev => ({ ...prev, jobRole: roles[0] || '' }));
    }
  }, [formData.department]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleSliderChange = (name: keyof PredictionInput, value: number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Small simulated delay for organic ML model feel
      await new Promise(resolve => setTimeout(resolve, 800));
      const res = await predictAttrition(formData);
      setResult(res);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Server prediction calculation failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      age: 32,
      department: 'Engineering',
      jobRole: 'Software Engineer',
      monthlyIncome: 6500,
      yearsAtCompany: 3,
      overTime: 'No',
      stressLevel: 2,
      workLifeBalance: 3,
      managerRating: 3,
      promotionInLast2Years: 'No',
      healthScore: 3,
      remoteWork: 'Yes',
      jobSatisfaction: 3,
      envSatisfaction: 3
    });
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6" id="prediction-page-container">
      {/* Page Header */}
      <div>
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
          Individual Risk Modeling
        </span>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Attrition Risk Evaluator
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Enter employee attributes to simulate flight probability on serverless runtime weights.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12" id="prediction-grid-layout">
        {/* Left Side: Parameters Form */}
        <div className="lg:col-span-7">
          <form 
            onSubmit={handleSubmit} 
            className="glass-card rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-sm space-y-6"
            id="attrition-form"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-500" />
                Employee Evaluation Parameters
              </h3>
              <button
                type="button"
                onClick={handleResetForm}
                className="text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1"
                id="reset-form-btn"
              >
                <RefreshCw className="h-3 w-3" /> Reset Inputs
              </button>
            </div>

            {/* Demographics Row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Current Age (Years)
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  min={18}
                  max={70}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white/50 px-3.5 py-2 text-sm dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
                  id="input-age"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Years at Company
                </label>
                <input
                  type="number"
                  name="yearsAtCompany"
                  value={formData.yearsAtCompany}
                  min={0}
                  max={45}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white/50 px-3.5 py-2 text-sm dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
                  id="input-yearsAtCompany"
                />
              </div>
            </div>

            {/* Department and Job Role Row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Business Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
                  id="input-department"
                >
                  {DEPARTMENTS.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Organizational Role
                </label>
                <select
                  name="jobRole"
                  value={formData.jobRole}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
                  id="input-jobRole"
                >
                  {(ROLES_BY_DEPT[formData.department] || []).map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Salary and Promotion Row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Monthly Income (USD)
                </label>
                <input
                  type="number"
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  min={1000}
                  max={30000}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white/50 px-3.5 py-2 text-sm dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
                  id="input-monthlyIncome"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center justify-between">
                  <span>Promotion in Last 2 Years?</span>
                </label>
                <div className="flex gap-4">
                  {['No', 'Yes'].map(option => (
                    <label 
                      key={option} 
                      className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-medium cursor-pointer transition-all ${
                        formData.promotionInLast2Years === option
                          ? 'border-indigo-500 bg-indigo-50/50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400'
                          : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300'
                      }`}
                      id={`label-promotion-${option.toLowerCase()}`}
                    >
                      <input
                        type="radio"
                        name="promotionInLast2Years"
                        value={option}
                        checked={formData.promotionInLast2Years === option}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Overtime and Remote options */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Required Overtime Requirements
                </label>
                <div className="flex gap-4">
                  {['No', 'Yes'].map(option => (
                    <label 
                      key={option} 
                      className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-medium cursor-pointer transition-all ${
                        formData.overTime === option
                          ? 'border-indigo-500 bg-indigo-50/50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400'
                          : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300'
                      }`}
                      id={`label-overtime-${option.toLowerCase()}`}
                    >
                      <input
                        type="radio"
                        name="overTime"
                        value={option}
                        checked={formData.overTime === option}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Remote Working Arrangement
                </label>
                <div className="flex gap-4">
                  {['No', 'Yes'].map(option => (
                    <label 
                      key={option} 
                      className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-medium cursor-pointer transition-all ${
                        formData.remoteWork === option
                          ? 'border-indigo-500 bg-indigo-50/50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400'
                          : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300'
                      }`}
                      id={`label-remote-${option.toLowerCase()}`}
                    >
                      <input
                        type="radio"
                        name="remoteWork"
                        value={option}
                        checked={formData.remoteWork === option}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Slider Indexes */}
            <div className="space-y-5 border-t border-slate-100 dark:border-slate-800 pt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Satisfaction & Stress Indexes
              </h4>

              {/* Stress Level */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Daily Stress Intensity Level</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                    {formData.stressLevel} / 4 ({['Low', 'Medium', 'High', 'Critical'][formData.stressLevel - 1]})
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={formData.stressLevel}
                  onChange={(e) => handleSliderChange('stressLevel', parseInt(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 dark:bg-slate-800 accent-indigo-600"
                  id="range-stressLevel"
                />
              </div>

              {/* Work-Life Balance */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Work-Life Balance Score</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                    {formData.workLifeBalance} / 4 ({['Poor', 'Fair', 'Good', 'Excellent'][formData.workLifeBalance - 1]})
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={formData.workLifeBalance}
                  onChange={(e) => handleSliderChange('workLifeBalance', parseInt(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 dark:bg-slate-800 accent-indigo-600"
                  id="range-workLifeBalance"
                />
              </div>

              {/* Manager Relationship Rating */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Direct Manager Relationship</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                    {formData.managerRating} / 4 ({['Poor', 'Fair', 'Good', 'Excellent'][formData.managerRating - 1]})
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={formData.managerRating}
                  onChange={(e) => handleSliderChange('managerRating', parseInt(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 dark:bg-slate-800 accent-indigo-600"
                  id="range-managerRating"
                />
              </div>

              {/* Job Satisfaction */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Job Content Satisfaction</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                    {formData.jobSatisfaction} / 4 ({['Low', 'Medium', 'High', 'Very High'][formData.jobSatisfaction - 1]})
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={formData.jobSatisfaction}
                  onChange={(e) => handleSliderChange('jobSatisfaction', parseInt(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 dark:bg-slate-800 accent-indigo-600"
                  id="range-jobSatisfaction"
                />
              </div>

              {/* Environment Satisfaction */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Workplace Environment Quality</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                    {formData.envSatisfaction} / 4 ({['Low', 'Medium', 'High', 'Very High'][formData.envSatisfaction - 1]})
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={formData.envSatisfaction}
                  onChange={(e) => handleSliderChange('envSatisfaction', parseInt(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 dark:bg-slate-800 accent-indigo-600"
                  id="range-envSatisfaction"
                />
              </div>

              {/* Health Score */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">General Employee Well-Being Index</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                    {formData.healthScore} / 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.healthScore}
                  onChange={(e) => handleSliderChange('healthScore', parseInt(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 dark:bg-slate-800 accent-indigo-600"
                  id="range-healthScore"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/10 cursor-pointer active:scale-[0.99] transition-all"
                id="predict-submit-btn"
              >
                {loading ? 'Evaluating Core Model...' : 'Assess Attrition Flight Risk'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Prediction Assessment Results */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <div 
            className="glass-card rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-sm flex flex-col justify-between flex-1 min-h-[400px]"
            id="result-panel-container"
          >
            {loading ? (
              <div className="flex-1 flex items-center justify-center h-full">
                <LoadingSpinner message="Querying runtime serverless function. Running individual evaluation logic..." />
              </div>
            ) : error ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
                <AlertTriangle className="h-10 w-10 text-rose-500 animate-bounce" />
                <h4 className="font-bold text-slate-800 dark:text-slate-100">Prediction Engine Fault</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                  {error}. Please check that your local server proxy configuration or Netlify routing redirects are set up correctly.
                </p>
              </div>
            ) : result ? (
              // Results Display
              <div className="space-y-6" id="prediction-success-result">
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="font-display font-bold text-slate-800 dark:text-white">
                      Assessment Result
                    </h3>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                      Processed on Netlify Serverless Logic
                    </p>
                  </div>
                  <RiskBadge level={result.riskLevel} />
                </div>

                {/* Main Prediction & Probability Dial */}
                <div className="text-center py-6 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                      Model Conclusion
                    </span>
                    <h2 className={`font-display text-3xl font-extrabold ${
                      result.prediction === 'Likely to Leave' 
                        ? 'text-rose-600 dark:text-rose-400' 
                        : 'text-emerald-600 dark:text-emerald-400'
                    }`}>
                      {result.prediction}
                    </h2>
                  </div>

                  {/* Probability Bar */}
                  <div className="max-w-xs mx-auto px-4 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                      <span>Flight Likelihood</span>
                      <span>{(result.probability * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          result.probability >= 0.7 
                            ? 'bg-rose-500' 
                            : result.probability >= 0.35 
                            ? 'bg-amber-500' 
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${result.probability * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Recommendations Bullet List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-indigo-400" />
                    Targeted HR Interventions
                  </h4>
                  <ul className="space-y-2.5" id="recommendations-list">
                    {result.recommendations.map((rec, index) => (
                      <li 
                        key={index} 
                        className="flex gap-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-indigo-50/20 dark:bg-indigo-950/10 p-2.5 rounded-lg border border-indigo-50 dark:border-indigo-950/40"
                      >
                        <CheckCircle className="h-4 w-4 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              // Empty State
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 p-4 text-indigo-600 dark:text-indigo-400">
                  <Sparkles className="h-10 w-10 animate-pulse" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-display font-bold text-slate-800 dark:text-slate-200 text-base">
                    Awaiting Employee Parameters
                  </h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs mx-auto leading-relaxed">
                    Adjust the employee metrics, satisfaction sliders, and tenure parameters on the left, then click <strong>Assess Attrition Flight Risk</strong> to initiate serverless predictive analytics.
                  </p>
                </div>
              </div>
            )}

            {/* Explanatory footer */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-6 text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Netlify Functions local proxy enabled. Live score calculation.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
