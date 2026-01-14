import React, { useState } from 'react';
import { Search, Loader2, Sparkles, Target, Lightbulb, FileText, ArrowRight, CheckCircle2, Circle, Code } from 'lucide-react';

const REASONING_STEPS = {
  COLLECTING: 'collecting',
  ANALYZING: 'analyzing',
  INFERRING: 'inferring',
  PLANNING: 'planning',
  COMPLETE: 'complete'
};

export const ReasoningSection = () => {
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Company Research');
  const [metadata, setMetadata] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!companyName.trim() || !jobDescription.trim()) return;

    setIsProcessing(true);
    setError(null);
    setAnalysis(null);
    setCurrentStep(REASONING_STEPS.COLLECTING);
    setLoadingProgress(0);
    setLoadingText('Company Research');

    try {
      // Check if input is a URL
      const isUrl = jobDescription.trim().startsWith('http://') || jobDescription.trim().startsWith('https://');
      
      // Stage 1: Scraping (if URL) or Company Research
      if (isUrl) {
        setLoadingText('Scraping Job Description');
        setLoadingProgress(0);
      } else {
        setLoadingText('Company Research');
        setLoadingProgress(0);
      }
      await new Promise(resolve => setTimeout(resolve, 800));

      // Stage 2: Job Description Analysis
      setLoadingText('Job Description Analysis');
      setLoadingProgress(33);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Stage 3: Generating Plan (during API call)
      setLoadingText('Generating Plan');
      setLoadingProgress(66);

      // Call API - works with Vercel serverless functions or external API
      const apiUrl = import.meta.env.VITE_API_URL || '/api/analyze-company';
      
      console.log('[Frontend] Calling API:', apiUrl);
      console.log('[Frontend] Request payload:', {
        companyName: companyName.trim(),
        jobDescriptionLength: jobDescription.trim().length
      });
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: companyName.trim(),
          jobDescription: jobDescription.trim(),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[Frontend] API error:', response.status, errorText);
        
        // Try to parse error message from response
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.message) {
            throw new Error(errorData.message);
          }
        } catch (e) {
          // If parsing fails, use default message
        }
        
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Ensure plan is a string (handle both old and new formats)
      const planText = typeof data.plan === 'string' ? data.plan : (data.plan?.plan || '');
      
      console.log('[Frontend] Response received:', {
        hasPlan: !!planText,
        planLength: planText?.length,
        planPreview: planText?.substring(0, 200)
      });
      
      // Check if plan has references
      if (planText) {
        const planLower = planText.toLowerCase();
        const hasBill = planLower.includes('bill');
        const hasSeelab = planLower.includes('seelab');
        const hasExperience = planLower.includes('experience') || planLower.includes('leveraging') || planLower.includes('building on');
        console.log('[Frontend] Plan reference check:', { hasBill, hasSeelab, hasExperience });
      }
      
      // Complete - ensure plan is always a string in analysis
      setAnalysis({
        ...data,
        plan: planText
      });
      setMetadata(data.metadata || null);
      setCurrentStep(REASONING_STEPS.COMPLETE);
      setLoadingProgress(100);
      setLoadingText('Complete');
      // Small delay to show completion before hiding
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (err) {
      console.error('Error analyzing company:', err);
      setError(err.message || 'Failed to generate analysis. Please try again.');
      setCurrentStep(null);
      setLoadingProgress(0);
      setLoadingText('Company Research');
    } finally {
      setIsProcessing(false);
    }
  };


  const getStepLabel = () => {
    switch (currentStep) {
      case REASONING_STEPS.PLANNING:
        return 'Analyzing company context, job requirements, and synthesizing strategic first 90 days plan...';
      default:
        return '';
    }
  };

  return (
    <section id="reasoning" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-28 scroll-mt-20">
      <div className="container max-w-4xl mx-auto">
        {/* Large text → claims */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-foreground leading-tight">
          What Rushil Would Do at Your Company
        </h1>
        
        {/* Medium → reasoning */}
        <div className="space-y-8 text-lg sm:text-xl text-foreground/90 leading-relaxed mb-12">
          <p>
            Enter your company name and job description. I'll analyze the company context, job requirements, and generate a strategic first 90 days plan tailored to your specific situation.
          </p>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="space-y-6 border border-border rounded-lg p-6 bg-card/50">
            <div>
              <label htmlFor="company" className="block text-sm font-semibold mb-2 text-foreground">
                Company Name
              </label>
              <input
                id="company"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g., Stripe, OpenAI, Anthropic"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isProcessing}
                required
              />
            </div>

            <div>
              <label htmlFor="jobDescription" className="block text-sm font-semibold mb-2 text-foreground">
                Job Description or URL
              </label>
              <textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here, or paste a URL to the job posting..."
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                disabled={isProcessing}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                You can paste either the job description text or a URL to the job posting. Note: Some sites (like Meta Careers, LinkedIn) may block automated access - if URL scraping fails, please copy and paste the job description text directly.
              </p>
            </div>

            {isProcessing ? (
              <div className="w-full">
                <div className="relative w-full h-12 rounded-lg bg-background border-2 border-primary overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${loadingProgress}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold text-foreground z-10" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3), 0 0 4px rgba(255,255,255,0.5)' }}>
                      {loadingText}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="submit"
                disabled={!companyName.trim() || !jobDescription.trim()}
                className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                <span>Generate My First 90 Days Plan</span>
              </button>
            )}
          </form>

          {/* Reasoning Process Visualization */}
          {isProcessing && currentStep && (
            <div className="border border-border rounded-lg p-6 bg-card/30 space-y-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                <h3 className="text-xl font-semibold text-foreground">Reasoning Process</h3>
              </div>
              
              <div className="space-y-3">
                <ReasoningStep
                  step={REASONING_STEPS.PLANNING}
                  currentStep={currentStep}
                  icon={Target}
                  label="Strategic Analysis & Planning"
                  description="Analyzing company context, job requirements, and synthesizing first 90 days plan"
                />
              </div>

              <p className="text-sm text-muted-foreground mt-4 italic">
                {getStepLabel()}
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="border border-red-500/50 rounded-lg p-6 bg-red-500/10">
              <p className="text-red-600 dark:text-red-400 font-semibold mb-2">Error</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          )}

          {/* Results */}
          {analysis && (
            <div className="space-y-6 mt-8">
              {/* Weak Signals Found */}
              {analysis.weakSignals && analysis.weakSignals.length > 0 && (
                <div className="border border-border rounded-lg p-6 bg-card/30">
                  <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Weak Signals Identified
                  </h3>
                  <ul className="space-y-2 text-base text-foreground/80">
                    {analysis.weakSignals.map((signal, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{signal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Inferences */}
              {analysis.inferences && (
                <div className="border border-border rounded-lg p-6 bg-card/30">
                  <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    Inferences
                  </h3>
                  <div className="space-y-4">
                    {analysis.inferences.mlMaturity && (
                      <div>
                        <p className="font-semibold text-foreground mb-1">ML Maturity Level</p>
                        <p className="text-base text-foreground/80">{analysis.inferences.mlMaturity}</p>
                      </div>
                    )}
                    {analysis.inferences.infraComplexity && (
                      <div>
                        <p className="font-semibold text-foreground mb-1">Infrastructure Complexity</p>
                        <p className="text-base text-foreground/80">{analysis.inferences.infraComplexity}</p>
                      </div>
                    )}
                    {analysis.inferences.likelyChallenges && (
                      <div>
                        <p className="font-semibold text-foreground mb-1">Likely Challenges</p>
                        <p className="text-base text-foreground/80">{analysis.inferences.likelyChallenges}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Parse and render plan with research section */}
              {analysis.plan && (() => {
                try {
                  // Ensure plan is a string - handle all possible formats
                  let planText = '';
                  try {
                    if (typeof analysis.plan === 'string') {
                      planText = analysis.plan;
                    } else if (analysis.plan && typeof analysis.plan === 'object') {
                      if (analysis.plan.plan && typeof analysis.plan.plan === 'string') {
                        planText = analysis.plan.plan;
                      } else {
                        planText = JSON.stringify(analysis.plan);
                      }
                    } else {
                      planText = String(analysis.plan || '');
                    }
                  } catch (e) {
                    console.error('Error extracting plan text:', e);
                    planText = 'Error: Could not parse plan data';
                  }
                  
                  if (!planText || planText.length === 0) {
                    return <div className="text-muted-foreground p-4">No plan generated.</div>;
                  }
                
                // Parse markdown sections
                const researchMatch = planText.match(/##\s*Research\s*&\s*Context\s*\n([\s\S]*?)(?=##|$)/i);
                const planMatch = planText.match(/##\s*First\s*90\s*Days\s*Plan\s*\n([\s\S]*)/i);
                
                // Remove hashtags from sections before parsing
                const researchSection = researchMatch ? researchMatch[1].trim().replace(/#+/g, '') : null;
                const planSection = planMatch ? planMatch[1].trim().replace(/#+/g, '') : planText.replace(/#+/g, '');
                
                // Parse research bullets
                const parseBullets = (text) => {
                  if (!text) return [];
                  return text.split('\n')
                    .filter(line => line.trim())
                    .map(line => line.replace(/^[-*•]\s*/, '').replace(/#+/g, '').trim())
                    .filter(line => line.length > 0);
                };
                
                // Helper function to remove hashtags and clean text
                const cleanText = (text) => {
                  if (!text || typeof text !== 'string') return '';
                  return text
                    .replace(/#+/g, '') // Remove all hashtags
                    .replace(/\*\*/g, '') // Remove markdown bold
                    .trim();
                };
                
                // Parse structured plan items (Title, Objective, Experience, Action)
                const parseStructuredItem = (text) => {
                  if (!text || typeof text !== 'string') return null;
                  
                  try {
                    // First, remove all hashtags from the entire text
                    text = text.replace(/#+/g, '').trim();
                    
                    // Extract Objective, Experience, Action first (to avoid matching them as titles)
                    const extractField = (fieldName, text) => {
                      try {
                        const patterns = [
                          // Pattern 1: **FieldName:** (markdown) - match until next **FieldName:** or end
                          new RegExp(`\\*\\*${fieldName}:\\*\\*\\s*([\\s\\S]+?)(?=\\*\\*[A-Za-z]+:|$)`, 'i'),
                          // Pattern 2: FieldName: (plain, stop at next field or end)
                          new RegExp(`${fieldName}:\\s*([\\s\\S]+?)(?=\\n\\s*(?:Objective|Experience|Action|Title):|$)`, 'i'),
                        ];
                        
                        for (const pattern of patterns) {
                          const match = text.match(pattern);
                          if (match && match[1]) {
                            const cleaned = cleanText(match[1]);
                            return cleaned || null;
                          }
                        }
                      } catch (e) {
                        console.error(`Error extracting ${fieldName}:`, e);
                      }
                      return null;
                    };
                    
                    const objective = extractField('Objective', text);
                    const experience = extractField('Experience', text);
                    const action = extractField('Action', text);
                    
                    // Extract Title - prioritize **Title:** pattern, but only if it's clearly a title
                    let title = null;
                    
                    try {
                      // Pattern 1: **Title:** (highest priority) - match until next **FieldName:** or end
                      const titleMatch1 = text.match(/\*\*Title:\*\*\s*([\s\S]+?)(?=\*\*[A-Za-z]+:|$)/i);
                      if (titleMatch1 && titleMatch1[1]) {
                        title = cleanText(titleMatch1[1]);
                      }
                      
                      // Pattern 2: Title: (without markdown, but only if not followed by Objective/Experience/Action)
                      if (!title) {
                        const titleMatch2 = text.match(/^Title:\s*([\s\S]+?)(?=\n\s*(?:Objective|Experience|Action):|$)/im);
                        if (titleMatch2 && titleMatch2[1]) {
                          title = cleanText(titleMatch2[1]);
                        }
                      }
                      
                      // Pattern 3: If no explicit title field, look for a title at the start
                      // (before any Objective/Experience/Action fields)
                      if (!title) {
                        // Find the position of the first field
                        const firstFieldMatch = text.match(/(?:Objective|Experience|Action):/i);
                        if (firstFieldMatch && firstFieldMatch.index !== undefined) {
                          const beforeFirstField = text.substring(0, firstFieldMatch.index).trim();
                          if (beforeFirstField && !beforeFirstField.match(/^(Objective|Experience|Action|Title):/i)) {
                            // Remove any leading numbers/bullets
                            const cleaned = beforeFirstField.replace(/^\d+\.\s*/, '').replace(/^[-*•]\s*/, '').trim();
                            if (cleaned && cleaned.length > 0) {
                              title = cleanText(cleaned);
                            }
                          }
                        } else {
                          // No fields found, first line might be title
                          const firstLineMatch = text.match(/^(.+?)(?=\n|$)/m);
                          if (firstLineMatch && firstLineMatch[1]) {
                            const potentialTitle = cleanText(firstLineMatch[1]);
                            // Only use if it doesn't look like a field name
                            if (potentialTitle && !potentialTitle.match(/^(Objective|Experience|Action|Title):/i)) {
                              title = potentialTitle;
                            }
                          }
                        }
                      }
                    } catch (e) {
                      console.error('Error extracting title:', e);
                    }
                    
                    // Only return item if we have at least a title or some content
                    if (!title && !objective && !experience && !action) {
                      return null;
                    }
                    
                    return {
                      title: title || null,
                      objective: objective || null,
                      experience: experience || null,
                      action: action || null,
                    };
                  } catch (e) {
                    console.error('Error parsing structured item:', e);
                    return null;
                  }
                };
                
                // Parse plan sections (Days 1-30, 31-60, 61-90)
                const parsePlanSections = (text) => {
                  const sections = [];
                  const day30Match = text.match(/Days?\s*1-30[:\n]([\s\S]*?)(?=Days?\s*31-60|Days?\s*61-90|$)/i);
                  const day60Match = text.match(/Days?\s*31-60[:\n]([\s\S]*?)(?=Days?\s*61-90|$)/i);
                  const day90Match = text.match(/Days?\s*61-90[:\n]([\s\S]*)/i);
                  
                  const parseItems = (sectionText) => {
                    if (!sectionText || !sectionText.trim()) return [];
                    
                    // Split by **Title:** markers - this is the primary format
                    let items = sectionText.split(/\*\*Title:\*\*/i);
                    
                    // Filter out empty items and section headers
                    items = items
                      .map((item, idx) => {
                        const trimmed = item.trim();
                        // Skip very short items
                        if (!trimmed || trimmed.length < 5) return null;
                        // Skip the first item if it's just a section header (before first **Title:**)
                        if (idx === 0) {
                          // If first item doesn't contain any field markers, it's likely a header
                          if (!trimmed.match(/(?:Objective|Experience|Action):/i)) {
                            return null;
                          }
                        }
                        // Skip items that are just section headers
                        if (trimmed.match(/^(Days?\s*\d+-\d+|First\s*\d+\s*Days?\s*Plan)[:\s]*$/i)) return null;
                        return trimmed;
                      })
                      .filter(item => item !== null);
                    
                    // Parse each item
                    return items
                      .map(item => parseStructuredItem(item))
                      .filter(item => item !== null && (item.title || item.objective || item.experience || item.action));
                  };
                  
                  if (day30Match) sections.push({ title: 'Days 1-30', items: parseItems(day30Match[1]) });
                  if (day60Match) sections.push({ title: 'Days 31-60', items: parseItems(day60Match[1]) });
                  if (day90Match) sections.push({ title: 'Days 61-90', items: parseItems(day90Match[1]) });
                  
                  return sections.length > 0 ? sections : [{ title: 'Plan', items: parseItems(text) }];
                };
                
                const researchBullets = researchSection ? parseBullets(researchSection) : null;
                const planSections = parsePlanSections(planSection);
                
                return (
                  <>
                    {/* Research & Context Section - Bubbles */}
                    {researchBullets && researchBullets.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-primary" />
                          Research & Context
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {researchBullets.map((bullet, idx) => (
                            <div
                              key={idx}
                              className="rounded-xl p-4 bg-gradient-to-br from-card to-card/50 border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                            >
                              <p className="text-foreground/90 leading-relaxed">{bullet}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* First 90 Days Plan - Bubbles */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                        <Target className="w-6 h-6 text-primary" />
                        First 90 Days at {companyName}
                      </h3>
                      <div className="space-y-10">
                        {planSections.map((section, sectionIdx) => (
                          <div key={sectionIdx} className="space-y-4">
                            <h4 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                              {section.title}
                            </h4>
                            <div className="grid grid-cols-1 gap-4">
                              {section.items.map((item, itemIdx) => (
                                <div
                                  key={itemIdx}
                                  className="rounded-xl p-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 shadow-sm hover:shadow-lg transition-all duration-200"
                                >
                                  <div className="text-foreground/90 leading-relaxed whitespace-pre-line">
                                    {item.title ? (
                                      <>
                                        <span className="text-primary font-bold">{itemIdx + 1}. </span>
                                        <span className="text-lg font-bold text-foreground">{item.title}</span>
                                        {'\n'}
                                      </>
                                    ) : (
                                      // If no title, show number only
                                      <span className="text-primary font-bold">{itemIdx + 1}. </span>
                                    )}
                                    {item.objective && (
                                      <>
                                        <span className="font-bold">Objective: </span>
                                        <span>{item.objective}</span>
                                        {'\n'}
                                      </>
                                    )}
                                    {item.experience && (
                                      <>
                                        <span className="font-bold">Experience: </span>
                                        <span>{item.experience}</span>
                                        {'\n'}
                                      </>
                                    )}
                                    {item.action && (
                                      <>
                                        <span className="font-bold">Action: </span>
                                        <span>{item.action}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                );
                } catch (error) {
                  console.error('Error parsing plan:', error);
                  console.error('Error stack:', error.stack);
                  console.error('Analysis plan type:', typeof analysis.plan);
                  console.error('Analysis plan value:', analysis.plan);
                  
                  // Return a safe error display
                  let errorDisplay = null;
                  try {
                    const planPreview = typeof analysis.plan === 'string' 
                      ? analysis.plan.substring(0, 500) 
                      : (analysis.plan?.plan ? analysis.plan.plan.substring(0, 500) : JSON.stringify(analysis.plan, null, 2));
                    
                    errorDisplay = (
                      <div className="text-red-500 p-4 border border-red-500/20 rounded-lg bg-red-500/5">
                        <p className="font-semibold mb-2">Error parsing plan</p>
                        <p className="text-sm mb-2">{error?.message || 'Unknown error occurred'}</p>
                        <details className="mt-2 text-xs">
                          <summary className="cursor-pointer">Raw plan data (first 500 chars)</summary>
                          <pre className="mt-2 p-2 bg-muted rounded overflow-auto max-h-40 text-xs">
                            {planPreview}
                          </pre>
                        </details>
                      </div>
                    );
                  } catch (displayError) {
                    console.error('Error creating error display:', displayError);
                    errorDisplay = (
                      <div className="text-red-500 p-4 border border-red-500/20 rounded-lg bg-red-500/5">
                        <p className="font-semibold mb-2">Error parsing plan</p>
                        <p className="text-sm">An error occurred while processing the plan. Please try again.</p>
                      </div>
                    );
                  }
                  
                  return errorDisplay;
                }
              })()}
              
              {/* Job Requirements Fit Analysis */}
              {analysis.jobFit && analysis.jobFit.length > 0 && (() => {
                // Sort requirements: matched first, unmatched last
                const sortedRequirements = [...analysis.jobFit].sort((a, b) => {
                  if (a.matches === b.matches) return 0;
                  return a.matches ? -1 : 1;
                });
                
                return (
                  <div className="mt-8 border border-border rounded-lg p-6 bg-card/50">
                    <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Job Requirements Fit
                    </h3>
                    <div className="space-y-3">
                      {sortedRequirements.map((req, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
                          <div className="mt-0.5 flex-shrink-0">
                            {req.matches ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            ) : (
                              <Circle className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className={`font-semibold ${req.matches ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {req.requirement}
                            </p>
                            {req.evidence && (
                              <p className="text-sm text-foreground/70 mt-1">{req.evidence}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
              
              {/* Metadata Micro-Signals */}
              {metadata && (
                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    {metadata.latency && typeof metadata.latency === 'number' && (
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Plan generated in {metadata.latency}ms
                      </span>
                    )}
                    {metadata.model && metadata.model !== 'fallback' && metadata.architecture && typeof metadata.architecture === 'string' && (
                      <span className="flex items-center gap-1">
                        <Code className="w-3 h-3" />
                        Uses {metadata.architecture.toLowerCase().includes('retrieval') ? 'Retrieval + ' : ''}{metadata.model}
                      </span>
                    )}
                    {metadata.cost && typeof metadata.cost === 'number' && metadata.cost > 0 && (
                      <span className="flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        Avg cost per run: ${metadata.cost.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Small → assumptions / caveats */}
        <div className="text-sm text-muted-foreground space-y-2 pt-8 border-t border-border">
          <p>
            <strong>Note:</strong> This analysis is generated from public signals and requires your company name and job description to provide context-specific insights.
          </p>
          <p>
            <strong>What this demonstrates:</strong> Weak-signal aggregation, structured reasoning from unstructured data, planning + synthesis, and agent orchestration.
          </p>
        </div>
      </div>
    </section>
  );
};

const getStepOrder = (step) => {
  const order = {
    [REASONING_STEPS.COLLECTING]: 1,
    [REASONING_STEPS.ANALYZING]: 2,
    [REASONING_STEPS.INFERRING]: 3,
    [REASONING_STEPS.PLANNING]: 4,
    [REASONING_STEPS.COMPLETE]: 5,
  };
  return order[step] || 0;
};

const ReasoningStep = ({ step, currentStep, icon: Icon, label, description }) => {
  const isActive = currentStep === step;
  const isComplete = getStepOrder(currentStep) > getStepOrder(step);

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
      isActive ? 'bg-primary/10 border border-primary/30' : 
      isComplete ? 'bg-primary/5 border border-border' : 
      'border border-border/50 opacity-60'
    }`}>
      <div className={`mt-0.5 ${isActive ? 'text-primary' : isComplete ? 'text-primary/70' : 'text-muted-foreground'}`}>
        {isComplete ? (
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
        ) : isActive ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Icon className="w-5 h-5" />
        )}
      </div>
      <div className="flex-1">
        <p className={`font-semibold ${isActive || isComplete ? 'text-foreground' : 'text-muted-foreground'}`}>
          {label}
        </p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
