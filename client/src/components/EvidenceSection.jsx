import React from 'react';

export const EvidenceSection = () => {
  return (
    <section id="evidence" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-28 scroll-mt-20">
      <div className="container max-w-4xl mx-auto">
        {/* Large text → claims */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-foreground leading-tight">
          Evidence
        </h1>
        
        {/* Medium → reasoning */}
        <div className="space-y-12 text-lg sm:text-xl text-foreground/90 leading-relaxed mb-12">
          <p className="text-xl sm:text-2xl text-foreground/80 italic">
            Proof only after relevance is established.
          </p>
          
          <p>
            The projects below are framed as evidence for specific claims about reasoning, not as a gallery. Each project exposes:
          </p>

          <div className="space-y-8">
            <div className="border-l-4 border-primary pl-6 py-4">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-foreground">Project Title</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Problem Class</h3>
                  <p className="text-base text-muted-foreground">
                    What category of problem did this solve? (e.g., retrieval at scale, evaluation under distribution shift, interpretability for stakeholders)
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Tradeoffs</h3>
                  <p className="text-base text-muted-foreground">
                    What decisions did we make and why? What did we optimize for, and what did we accept as constraints? (Example: "Prioritized latency over accuracy because real-time inference was a hard requirement.")
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Where It Breaks</h3>
                  <p className="text-base text-muted-foreground">
                    Under what conditions does this solution fail? What assumptions did we make that could invalidate the approach? (Example: "Performance degrades when input distribution shifts beyond training domain.")
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">At Scale</h3>
                  <p className="text-base text-muted-foreground">
                    What would change if we scaled this 10x, 100x? Infrastructure concerns, evaluation challenges, operational complexity. (Example: "Current batch processing would need to move to streaming; monitoring would need automated anomaly detection.")
                  </p>
                </div>
              </div>
            </div>

            {/* Placeholder for additional projects */}
            <div className="text-sm text-muted-foreground italic border-t border-border pt-4">
              More evidence projects will be added here, each following this structure.
            </div>
          </div>
        </div>

        {/* Small → assumptions / caveats */}
        <div className="text-sm text-muted-foreground space-y-2 pt-8 border-t border-border">
          <p>
            <strong>Note:</strong> This section is independently coherent. Each project should be readable without context from other sections.
          </p>
          <p>
            <strong>Design:</strong> Projects are not displayed as a grid or gallery. They are narrative blocks that support reasoning claims.
          </p>
        </div>
      </div>
    </section>
  );
};
