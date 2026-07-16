# PulseHR: Employee Attrition AI Analytics (Netlify-Ready)

PulseHR is an enterprise-grade workforce stability dashboard and predictive HR analytics application. Built on **React, TypeScript, Tailwind CSS, and Recharts**, it uses **Netlify Serverless Functions** to calculate flight probabilities of key individual contributors dynamically on high-speed serverless infrastructure.

---

## 🚀 Key Features

*   **Executive Dashboard**: High-level telemetry of the organizational workforce, including stability ratio, average tenure, average salary, and priority action alerts.
*   **Deep HR Analytics**: A Bento-grid breakdown of employee metrics, including attrition percentages segmented by **Department, Salary cohorts, Overtime, Stress Levels, Work-Life balance rating, and Generational age bands**.
*   **Attrition Flight Predictor**: An interactive predictive HR modeling form with dynamic, context-aware parameter inputs.
*   **Explainable AI (XAI)**: Transparency layouts displaying global feature importance rankings alongside an interactive **SHAP Additive Decomposition** model showing precisely how individual features influence final flight calculations.
*   **Netlify Serverless Deployment Ready**: Native integration with Netlify Functions out-of-the-box, including pre-configured `netlify.toml` redirects.
*   **High-Contrast Design**: Premium Glassmorphism visual cues, custom scrollbars, and persistent Light / Slate-Dark modes.

---

## 📁 Repository Directory Structure

```text
Employee-Attrition-Analysis/
│
├── dataset/
│   └── employee_attrition_dataset.csv  # 10,000-employee synthetic CSV dataset
│
├── netlify/
│   └── functions/
│       └── predict.js                  # Serverless AWS Lambda prediction module
│
├── src/
│   ├── components/                     // Reusable visual primitives
│   │   ├── Sidebar.tsx                 // Vertical navigation drawer
│   │   ├── Navbar.tsx                  // Top panel, theme controls, user badge
│   │   ├── KpiCard.tsx                 // Numeric statistics card
│   │   ├── ChartCard.tsx               // Responsive Recharts card wrapper
│   │   ├── LoadingSpinner.tsx          // Micro-animated assessment indicators
│   │   └── RiskBadge.tsx               // Attrition hazard rating tags
│   │
│   ├── pages/                          // Modular route views
│   │   ├── Home.tsx                    // PulseHR overview dashboard
│   │   ├── Analytics.tsx               // workforce structural charts
│   │   ├── Prediction.tsx              // Individual parameter inputs & outputs
│   │   ├── Explain.tsx                 // Interpretability weights & SHAP visualizer
│   │   └── About.tsx                   // Systems architecture flow & author credits
│   │
│   ├── utils/
│   │   ├── api.ts                      // Attrition prediction client caller
│   │   └── analyticsData.ts            // Aggregated cohort datasets
│   │
│   ├── App.tsx                         // Navigation, theme sync, routing
│   ├── index.css                       // Fonts, custom scrollbars, global theme
│   └── main.tsx                        // Base DOM bootstrap
│
├── index.html                          // Entry document
├── package.json                        // Dependencies and local script mappings
├── vite.config.ts                      // Vite bundler config with local Netlify simulator proxy
├── netlify.toml                        // Netlify build and routing specifications
└── README.md                           // Technical project documentation
```

---

## 🛠️ Local Installation & Development

To clone, test, and run the PulseHR dashboard on your local system, follow these simple steps:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/sudhanshunikam1/Employee-Attrition-Analysis.git
    cd Employee-Attrition-Analysis
    ```

2.  **Install Base Dependencies**:
    ```bash
    npm install
    ```

3.  **Boot Development Server**:
    ```bash
    npm run dev
    ```
    Vite will start the server at `http://localhost:3000`. 
    
    *Note: During local development, the Vite server uses a built-in Netlify functions simulator middleware in `vite.config.ts` to process `/api/predict` calls directly in Node.js on port 3000, allowing you to test full end-to-end flight predictions with zero external server setups!*

4.  **Perform Production Build Check**:
    ```bash
    npm run build
    ```
    Your fully-optimized static client SPA files are written to `dist/`, fully prepped for production CDN delivery.

---

## ☁️ Continuous Deployment to Netlify

PulseHR is built to deploy instantly on Netlify via zero-config GitHub pipelines:

### Step-by-Step Pipeline Setup:

1.  **Push Code to GitHub**:
    Initialize git, commit your changes, and push your repository to your personal GitHub account.
    ```bash
    git init
    git add .
    git commit -m "feat: initial release of PulseHR Netlify dashboard"
    git branch -M main
    git remote add origin <your-github-repo-url>
    git push -u origin main
    ```

2.  **Import Repo in Netlify**:
    *   Sign in to the [Netlify Dashboard](https://app.netlify.com/).
    *   Click **Add new site** → select **Import an existing project**.
    *   Connect your GitHub account and select your `Employee-Attrition-Analysis` repository.

3.  **Configure Build & Deploy Settings**:
    Netlify will automatically detect and read the pre-configured `/netlify.toml` file inside the repository. The following values should be applied:
    *   **Build Command**: `npm run build`
    *   **Publish Directory**: `dist`
    *   **Functions Directory**: `netlify/functions`

4.  **Launch Site**:
    Click **Deploy Site**. Netlify will build the React bundle using Vite, spin up the AWS Lambda serverless endpoints, set up route proxies, and supply a live, publicly accessible URL for your HR SaaS dashboard!

---

## 🧠 Attrition Scoring Algorithm Weights

Calculated in real-time inside the serverless function (`netlify/functions/predict.js`) using additive linear parameters:

*   **Required Overtime Mandates**: $+25\%$ attrition risk
*   **Low Compensation (< $5k/mo)**: $+20\%$ attrition risk
*   **High Stress Intensity (Level 3-4)**: $+20\%$ attrition risk
*   **Poor Work-Life Balance (Level 1)**: $+15\%$ attrition risk
*   **Low Manager Relationship Score**: $+10\%$ attrition risk
*   **Low Job Satisfaction Indices**: $+10\%$ attrition risk
*   **Recent Promotion (Last 2 Yrs)**: $-10\%$ attrition risk (mitigation)
*   **Remote Work Arrangement Options**: $-5\%$ attrition risk (mitigation)
*   **High Well-Being/Health Scores**: $-5\%$ attrition risk (mitigation)

---

## 🌟 Future Roadmap

*   **Dynamic CSV Analytics**: Integrate a client-side streaming PapaParse CSV loader on the Analytics view to dynamically read custom workforce files.
*   **Time-Series Retention Forecasts**: Implement moving-average algorithms to predict company turnover across upcoming quarterly divisions.
*   **Interactive Mitigation Simulator**: Integrate slider parameters on the Home view allowing HR leads to simulate how general salary adjustments or stress-reduction measures drop attrition rates company-wide in real-time.

---

## 👤 Author Contact Info

*   **Lead Author**: Sudhanshu Nikam
*   **Email**: `sudhanshunikam1@gmail.com`
*   **Core Focus**: Deep Learning Workflows, Full-Stack Architecture, Data Engineering.
