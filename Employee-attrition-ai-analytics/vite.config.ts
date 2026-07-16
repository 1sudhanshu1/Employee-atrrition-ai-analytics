import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'netlify-functions-simulator',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/api/predict' && req.method === 'POST') {
              let body = '';
              req.on('data', chunk => {
                body += chunk;
              });
              req.on('end', () => {
                try {
                  const data = JSON.parse(body || '{}');
                  
                  const age = parseInt(data.age) || 30;
                  const department = data.department || 'Engineering';
                  const jobRole = data.jobRole || 'Software Engineer';
                  const monthlyIncome = parseFloat(data.monthlyIncome) || 6000;
                  const yearsAtCompany = parseInt(data.yearsAtCompany) || 3;
                  const overTime = data.overTime || 'No';
                  const stressLevel = parseInt(data.stressLevel) || 2;
                  const workLifeBalance = parseInt(data.workLifeBalance) || 3;
                  const managerRating = parseInt(data.managerRating) || 3;
                  const promotionInLast2Years = data.promotionInLast2Years || 'No';
                  const healthScore = parseInt(data.healthScore) || 3;
                  const remoteWork = data.remoteWork || 'No';
                  const jobSatisfaction = parseInt(data.jobSatisfaction) || 3;
                  const envSatisfaction = parseInt(data.envSatisfaction) || 3;

                  let score = 15;
                  if (overTime === 'Yes') score += 25;
                  if (monthlyIncome < 5000) score += 20;
                  if (stressLevel >= 3) score += 20;
                  if (workLifeBalance <= 2) score += 15;
                  if (managerRating <= 2) score += 10;
                  if (jobSatisfaction <= 2) score += 10;
                  if (envSatisfaction <= 2) score += 10;

                  if (promotionInLast2Years === 'Yes') score -= 10;
                  if (healthScore >= 4) score -= 5;
                  if (remoteWork === 'Yes') score -= 5;
                  if (yearsAtCompany > 5) score -= 5;

                  const probability = Math.max(2, Math.min(98, score)) / 100;
                  const prediction = probability >= 0.5 ? 'Likely to Leave' : 'Likely to Stay';
                  
                  let riskLevel = 'Low';
                  if (probability >= 0.7) riskLevel = 'High';
                  else if (probability >= 0.35) riskLevel = 'Medium';

                  const recommendations = [];
                  if (overTime === 'Yes') {
                    recommendations.push('Review workload distribution and overtime policies. Consider hiring additional headcount or outsourcing repetitive tasks to decrease burnout.');
                  }
                  if (monthlyIncome < 5000) {
                    recommendations.push(`Conduct a competitive market-rate salary benchmark for the ${jobRole} role. Presenting a salary adjustment could mitigate immediate exit risk.`);
                  }
                  if (stressLevel >= 3) {
                    recommendations.push('Establish direct stress-reduction measures, such as mandatory wellness days, workload caps, or direct supportive mentorship.');
                  }
                  if (workLifeBalance <= 2) {
                    recommendations.push('Introduce flexible working hour policies or increase remote work options to help the employee balance domestic and job requirements.');
                  }
                  if (managerRating <= 2) {
                    recommendations.push('Facilitate a constructive 1-on-1 dialogue with leadership or a skip-level mentor to mend team relationship issues or communication gaps.');
                  }
                  if (jobSatisfaction <= 2) {
                    recommendations.push('Evaluate job scope alignment. Arrange professional training or clear horizontal career growth paths to re-engage interest.');
                  }
                  if (promotionInLast2Years === 'No' && yearsAtCompany >= 4) {
                    recommendations.push('Design a clear upward mobility or promotion roadmap. Long tenure without vertical steps triggers active external searches.');
                  }
                  if (envSatisfaction <= 2) {
                    recommendations.push('Improve the general office environment or team culture. Collect feedback about workspace comfort and team collaboration dynamics.');
                  }

                  if (recommendations.length === 0) {
                    recommendations.push('Maintain current positive career growth trajectory. Continue regular monthly 1-on-1 career development check-ins.');
                    recommendations.push('Consider enrolling the employee as a cultural peer mentor for new joiners to boost leadership qualities.');
                  }

                  const featureWeights = [
                    { name: 'Overtime', weight: overTime === 'Yes' ? 25 : 0 },
                    { name: 'Low Income', weight: monthlyIncome < 5000 ? 20 : 0 },
                    { name: 'Stress Level', weight: stressLevel >= 3 ? 20 : 0 },
                    { name: 'Work-Life Balance', weight: workLifeBalance <= 2 ? 15 : 0 },
                    { name: 'Manager Relationship', weight: managerRating <= 2 ? 10 : 0 },
                    { name: 'Job Satisfaction', weight: jobSatisfaction <= 2 ? 10 : 0 },
                    { name: 'Recent Promotion', weight: promotionInLast2Years === 'Yes' ? -10 : 0 },
                    { name: 'Health Score', weight: healthScore >= 4 ? -5 : 0 }
                  ].filter(f => f.weight !== 0);

                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({
                    prediction,
                    probability,
                    riskLevel,
                    recommendations,
                    featureWeights,
                    inputDump: { age, department, jobRole, monthlyIncome, yearsAtCompany, overTime, stressLevel, workLifeBalance, managerRating, promotionInLast2Years, healthScore, remoteWork, jobSatisfaction, envSatisfaction }
                  }));
                } catch (e) {
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: e.message }));
                }
              });
              return;
            }
            next();
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
