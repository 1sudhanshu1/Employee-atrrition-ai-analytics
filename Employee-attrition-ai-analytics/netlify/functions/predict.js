/**
 * Netlify serverless function for Attrition Prediction
 */
exports.handler = async function (event, context) {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');

    // Extract inputs with sensible defaults
    const age = parseInt(data.age) || 30;
    const department = data.department || 'Engineering';
    const jobRole = data.jobRole || 'Software Engineer';
    const monthlyIncome = parseFloat(data.monthlyIncome) || 6000;
    const yearsAtCompany = parseInt(data.yearsAtCompany) || 3;
    const overTime = data.overTime || 'No';
    const stressLevel = parseInt(data.stressLevel) || 2; // 1-4
    const workLifeBalance = parseInt(data.workLifeBalance) || 3; // 1-4
    const managerRating = parseInt(data.managerRating) || 3; // 1-4
    const promotionInLast2Years = data.promotionInLast2Years || 'No';
    const healthScore = parseInt(data.healthScore) || 3; // 1-5
    const remoteWork = data.remoteWork || 'No';
    const jobSatisfaction = parseInt(data.jobSatisfaction) || 3; // 1-4
    const envSatisfaction = parseInt(data.envSatisfaction) || 3; // 1-4

    // Realistic Scoring System based on prompt requirements
    let score = 15; // base risk score out of 100

    // Additive risk rules
    if (overTime === 'Yes') score += 25;
    if (monthlyIncome < 5000) score += 20;
    if (stressLevel >= 3) score += 20;
    if (workLifeBalance <= 2) score += 15;
    if (managerRating <= 2) score += 10;
    if (jobSatisfaction <= 2) score += 10;
    if (envSatisfaction <= 2) score += 10;

    // Subtractive risk rules (mitigating factors)
    if (promotionInLast2Years === 'Yes') score -= 10;
    if (healthScore >= 4) score -= 5;
    if (remoteWork === 'Yes') score -= 5;
    if (yearsAtCompany > 5) score -= 5;

    // Clamp score to 2 - 98 range
    const probability = Math.max(2, Math.min(98, score)) / 100;

    // Determine prediction status and risk level
    const prediction = probability >= 0.5 ? 'Likely to Leave' : 'Likely to Stay';
    
    let riskLevel = 'Low';
    if (probability >= 0.7) {
      riskLevel = 'High';
    } else if (probability >= 0.35) {
      riskLevel = 'Medium';
    }

    // Dynamic HR Recommendations
    const recommendations = [];

    if (overTime === 'Yes') {
      recommendations.push(
        'Review workload distribution and overtime policies. Consider hiring additional headcount or outsourcing repetitive tasks to decrease burnout.'
      );
    }
    if (monthlyIncome < 5000) {
      recommendations.push(
        `Conduct a competitive market-rate salary benchmark for the ${jobRole} role. Presenting a salary adjustment could mitigate immediate exit risk.`
      );
    }
    if (stressLevel >= 3) {
      recommendations.push(
        'Establish direct stress-reduction measures, such as mandatory wellness days, workload caps, or direct supportive mentorship.'
      );
    }
    if (workLifeBalance <= 2) {
      recommendations.push(
        'Introduce flexible working hour policies or increase remote work options to help the employee balance domestic and job requirements.'
      );
    }
    if (managerRating <= 2) {
      recommendations.push(
        'Facilitate a constructive 1-on-1 dialogue with leadership or a skip-level mentor to mend team relationship issues or communication gaps.'
      );
    }
    if (jobSatisfaction <= 2) {
      recommendations.push(
        'Evaluate job scope alignment. Arrange professional training or clear horizontal career growth paths to re-engage interest.'
      );
    }
    if (promotionInLast2Years === 'No' && yearsAtCompany >= 4) {
      recommendations.push(
        'Design a clear upward mobility or promotion roadmap. Long tenure without vertical steps triggers active external searches.'
      );
    }
    if (envSatisfaction <= 2) {
      recommendations.push(
        'Improve the general office environment or team culture. Collect feedback about workspace comfort and team collaboration dynamics.'
      );
    }

    // Default recommendation if stay is predicted and score is clean
    if (recommendations.length === 0) {
      recommendations.push(
        'Maintain current positive career growth trajectory. Continue regular monthly 1-on-1 career development check-ins.'
      );
      recommendations.push(
        'Consider enrolling the employee as a cultural peer mentor for new joiners to boost leadership qualities.'
      );
    }

    // Feature contributing weights for Explainable AI breakdown
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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        prediction,
        probability,
        riskLevel,
        recommendations,
        featureWeights,
        inputDump: {
          age,
          department,
          jobRole,
          monthlyIncome,
          yearsAtCompany,
          overTime,
          stressLevel,
          workLifeBalance,
          managerRating,
          promotionInLast2Years,
          healthScore,
          remoteWork,
          jobSatisfaction,
          envSatisfaction
        }
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to process prediction: ' + error.message })
    };
  }
};
