import React from 'react';

export const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-28 scroll-mt-20">
      <div className="container max-w-4xl mx-auto">
        {/* Large text → claims */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-foreground leading-tight">
          About Rushil
        </h1>
        
        {/* Medium → reasoning */}
        <div className="space-y-6 text-lg sm:text-xl text-foreground/90 leading-relaxed mb-12">
          <p>
            I'm an ML engineer who reasons in concepts, not tools. I think about problem classes, tradeoffs, and failure modes before reaching for solutions.
          </p>
          <p>
            When I approach a new problem space, I start with assumptions, identify weak signals in data, and form hypotheses under uncertainty. I believe in establishing relevance before presenting evidence.
          </p>
          <p>
            What I value: clear thinking over impressive tech stacks, strategic reasoning over tactical implementation, and honest communication about limitations.
          </p>
        </div>

        {/* Small → assumptions / caveats */}
        <div className="text-sm text-muted-foreground space-y-2 pt-8 border-t border-border">
          <p>
            <strong>Assumption:</strong> You're evaluating ML engineers based on reasoning ability, not project count.
          </p>
          <p>
            <strong>Caveat:</strong> This site is not a portfolio. It's a guided reasoning experience designed to demonstrate how I think.
          </p>
        </div>
      </div>
    </section>
  );
};
