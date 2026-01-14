# Debugging LLM Response Issues

## Problem
Test script works but website shows different responses.

## Solution Steps

### 1. **Restart the Server**
The most common issue is that the server is running old cached code.

```bash
# Stop the current server (Ctrl+C)
# Then restart:
cd client
npm run server
```

Or if using `dev:all`:
```bash
# Stop both servers (Ctrl+C)
# Then restart:
cd client
npm run dev:all
```

### 2. **Check Server Logs**
When you make a request, you should see logs like:
```
[API] Request received: { companyName: '...', jobDescriptionLength: ... }
[API] Weak signals collected: X
[API] Inferences: { ... }
[API] Generating 90-day plan...
[generate90DayPlan] Using OpenAI API
[generate90DayPlan] Model: gpt-4o
[generate90DayPlan] Job description keywords detected: { hasClaudeCode: true, ... }
[generate90DayPlan] Response received, length: XXXX
[generate90DayPlan] References found - BILL: true SEELab: true
[API] Plan generated, length: XXXX
```

### 3. **Check Browser Console**
Open browser DevTools (F12) and check the Console tab. You should see:
```
[Frontend] Calling API: /api/analyze-company
[Frontend] Request payload: { ... }
[Frontend] Response received: { hasPlan: true, planLength: XXXX, ... }
[Frontend] Plan reference check: { hasBill: true, hasSeelab: true, ... }
```

### 4. **Verify API Key**
Make sure `.env.local` exists and has:
```
OPENAI_API_KEY=sk-...
```

### 5. **Check for Errors**
If you see errors in server logs like:
- `[generate90DayPlan] LLM API error, falling back to template`
- `OpenAI API error: 401` (invalid API key)
- `OpenAI API error: 429` (rate limit)

These will cause it to use the fallback template instead of LLM.

### 6. **Verify Model**
The code now uses `gpt-4o` (not `gpt-4o-mini`). Make sure your API key has access to this model.

## Quick Test

1. Restart server: `npm run server` (in client folder)
2. Open website: http://localhost:5173
3. Open browser console (F12)
4. Enter test case: "develop an internal coding assistant using claude code, then work on building llm and sensor integrations with wearable sensors"
5. Check console logs for:
   - `[generate90DayPlan] Job description keywords detected: { hasClaudeCode: true, hasSensorLLM: true, ... }`
   - `[generate90DayPlan] References found - BILL: true SEELab: true`

If you see `BILL: false SEELab: false`, the LLM is not following instructions. Check the server logs for the full prompt being sent.

## If Still Not Working

Check the server logs for the actual prompt being sent. The prompt should include:
- Keyword matches section
- Few-shot examples
- Explicit instructions about referencing past experiences

If the prompt looks correct but responses don't have references, the issue is with the LLM not following instructions. We may need to:
- Use a different model
- Adjust temperature
- Use structured output format
- Add more explicit constraints
