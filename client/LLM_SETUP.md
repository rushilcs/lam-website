# LLM Setup Guide for "What I'd Do" Section

This guide shows you how to set up OpenAI API integration for the interactive "What I'd Do at Your Company" section.

## Quick Setup (3 Steps)

### Step 1: Get Your OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (it starts with `sk-`)

### Step 2: Create `.env.local` File

In the `client` folder, create a file named `.env.local`:

```bash
cd client
touch .env.local
```

Add your API key to the file:

```bash
OPENAI_API_KEY=sk-your-actual-key-here
```

**Important:** 
- Replace `sk-your-actual-key-here` with your actual API key
- Never commit `.env.local` to git (it's already in `.gitignore`)
- The file should be in the `client` folder, not the root

### Step 3: Start the Development Servers

You need to run TWO servers:

**Terminal 1 - API Server:**
```bash
cd client
npm run server
```

**Terminal 2 - Frontend (Vite):**
```bash
cd client
npm run dev
```

**OR use the combined command (runs both):**
```bash
cd client
npm run dev:all
```

## Verification

1. Open http://localhost:5173 in your browser
2. Navigate to the "What I'd Do" section
3. Enter a company name and job description
4. Click "Generate My First 90 Days Plan"
5. You should see:
   - ✅ "OpenAI API key found - LLM features enabled" in the API server console
   - ✅ An LLM-generated personalized 90-day plan (not the template)

## Troubleshooting

### "API error not found"
- Make sure both servers are running (API server on port 3000, Vite on port 5173)
- Check that the API server console shows it's running

### "No OpenAI API key found"
- Verify `.env.local` exists in the `client` folder
- Check that the API key format is correct: `OPENAI_API_KEY=sk-...`
- Make sure there are no extra spaces or quotes around the key
- Restart the API server after creating/updating `.env.local`

### API calls failing
- Verify your OpenAI API key is valid
- Check your OpenAI account has credits/usage available
- Check the API server console for error messages

## For Production Deployment (Vercel)

1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add `OPENAI_API_KEY` with your API key value
4. Deploy

The Vercel serverless function at `api/analyze-company.js` will automatically use the environment variable.

## Cost Notes

- Using `gpt-4o-mini` model (cost-effective)
- Each analysis uses ~2 API calls (inference + plan generation)
- Estimated cost: ~$0.001-0.002 per analysis
- You can monitor usage at https://platform.openai.com/usage

## Without API Key (Fallback Mode)

If you don't add an API key, the system will still work using intelligent heuristics based on:
- Job description keyword analysis
- Tech stack extraction
- Pattern matching for ML maturity signals

This provides a working demo but without LLM-generated personalized plans.
