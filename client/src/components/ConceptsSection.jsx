import React from 'react';

export const ConceptsSection = () => {
  return (
    <section id="concepts" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-28 scroll-mt-20">
      <div className="container max-w-4xl mx-auto">
        {/* Large text → claims */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-foreground leading-tight">
          Concepts
        </h1>
        
        {/* Medium → reasoning */}
        <div className="space-y-8 text-lg sm:text-xl text-foreground/90 leading-relaxed mb-12">
          <p className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
            The Intellectual Bridge
          </p>
          
          <p>
            I think in abstractions. The concepts I reason about include:
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-foreground">Retrieval</h2>
              <p className="text-base text-muted-foreground">
                How do we find relevant information efficiently? What makes retrieval effective at scale, and where does it break?
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-foreground">Evaluation</h2>
              <p className="text-base text-muted-foreground">
                Metrics that matter versus metrics that optimize. How do we evaluate systems, not just models? What happens when offline metrics diverge from online behavior?
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-foreground">Interpretability</h2>
              <p className="text-base text-muted-foreground">
                When do we need to understand why, and for whom? Striking the balance between explainability and performance, especially in production systems.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-foreground">Infrastructure</h2>
              <p className="text-base text-muted-foreground">
                ML systems are software systems. How do we build pipelines that are reliable, debuggable, and maintainable? What infrastructure patterns support rapid experimentation?
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-foreground">Failure Modes</h2>
              <p className="text-base text-muted-foreground">
                Where will this break? What edge cases matter? How do we design for graceful degradation? Projects are secondary to understanding these concepts.
              </p>
            </div>
          </div>
        </div>

        {/* Small → assumptions / caveats */}
        <div className="text-sm text-muted-foreground space-y-2 pt-8 border-t border-border">
          <p>
            <strong>Note:</strong> Projects are framed as evidence for these concepts, not as standalone showcases. See "Evidence" section.
          </p>
        </div>
      </div>
    </section>
  );
};
