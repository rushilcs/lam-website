# Company Analysis API

This API endpoint analyzes companies based on public signals and job descriptions to generate personalized ML engineer 90-day plans.

## Setup

### Environment Variables

Create a `.env.local` file in the root directory with:

```bash
# Optional: OpenAI API Key for LLM-powered analysis
OPENAI_API_KEY=sk-...

# OR

# Optional: Anthropic API Key for LLM-powered analysis
ANTHROPIC_API_KEY=sk-ant-...

# Optional: Custom API URL (if deploying API separately)
VITE_API_URL=https://your-api-url.com/api/analyze-company
```

### Without LLM API Keys

The API will fall back to intelligent heuristics based on:
- Job description keyword analysis
- Tech stack extraction
- Pattern matching for ML maturity signals

While less powerful than LLM-generated plans, this provides a working demo.

## Deployment

### Vercel (Recommended)

1. The `api/analyze-company.js` file is automatically detected as a serverless function
2. Add environment variables in Vercel dashboard: Settings → Environment Variables
3. Deploy via GitHub integration or `vercel deploy`

### Alternative: External API Service

If deploying elsewhere (e.g., GitHub Pages), you can:

1. Host the API separately (e.g., Railway, Render, Fly.io)
2. Set `VITE_API_URL` environment variable to point to your API
3. Update `vite.config.js` to proxy API requests during development

## API Endpoint

**POST** `/api/analyze-company`

### Request Body

```json
{
  "companyName": "Stripe",
  "jobDescription": "Senior ML Engineer at Stripe..."
}
```

### Response

```json
{
  "weakSignals": [
    "Mentions of production systems suggests operational ML maturity",
    "Tech stack mentioned: pytorch, kubernetes, aws"
  ],
  "inferences": {
    "mlMaturity": "Advanced",
    "infraComplexity": "High",
    "likelyChallenges": "Managing technical debt at scale..."
  },
  "plan": "## First 30 Days: Understanding and Mapping\n\n1. Map the ML infrastructure..."
}
```

## Features

### Weak-Signal Aggregation
- Analyzes job description for keywords and patterns
- Extracts tech stack mentions
- Identifies ML maturity indicators

### Structured Inference
- ML Maturity Level (Early/Intermediate/Advanced)
- Infrastructure Complexity (Low/Medium/High)
- Likely Challenges identification

### LLM-Powered Planning
- Generates personalized 90-day plans using GPT-4 or Claude
- Demonstrates strategic thinking and tradeoff understanding
- Context-aware recommendations

## Future Enhancements

- Web scraping for actual blog posts and job ads
- Integration with company APIs (LinkedIn, GitHub)
- Caching for repeated company analyses
- Rate limiting and authentication
