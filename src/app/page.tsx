import type { Metadata } from "next";
import { profile, workItems } from "@/content/content";
import CardGrid from "@/components/CardGrid";

export const metadata: Metadata = {
  title: "Work | Lakshmi Mulgund",
  description: "Portfolio of visual creative work by Lakshmi Mulgund",
};

export default function HomePage() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      {/* Hero Section */}
      <section className="mb-16 md:mb-24">
        <h1 className="text-4xl md:text-6xl font-semibold mb-6 tracking-tight">
          {profile.fullName}
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed">
          {profile.tagline}
        </p>
      </section>

      {/* Work Grid */}
      <section>
        <CardGrid items={workItems} />
      </section>
    </div>
  );
}
