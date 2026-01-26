import type { Metadata } from "next";
import { profile } from "@/content/content";

export const metadata: Metadata = {
  title: "About | Lakshmi Mulgund",
  description: "About Lakshmi Advaithi Mulgund - Visual creative, photographer, designer, and storyteller",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-semibold mb-8 tracking-tight">
          About
        </h1>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <p className="text-lg">
            {profile.bio}
          </p>

          <div className="border-t border-border pt-8">
            <h2 className="text-xl font-semibold mb-4">Roles</h2>
            <ul className="space-y-2">
              {profile.roles.map((role) => (
                <li key={role} className="text-foreground/70">
                  {role}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border pt-8">
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            <p className="text-foreground/70 mb-2">{profile.education.institution}</p>
            <ul className="space-y-1 text-foreground/70">
              {profile.education.degrees.map((degree) => (
                <li key={degree}>{degree}</li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border pt-8">
            <h2 className="text-xl font-semibold mb-4">Current</h2>
            <p className="text-foreground/70">{profile.current}</p>
          </div>

          <div className="border-t border-border pt-8">
            <h2 className="text-xl font-semibold mb-4">Contact</h2>
            <div className="space-y-2 text-foreground/70">
              <p>
                <a
                  href={`https://instagram.com/${profile.contact.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors underline"
                >
                  {profile.contact.instagram}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="hover:text-foreground transition-colors underline"
                >
                  {profile.contact.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${profile.contact.phone}`}
                  className="hover:text-foreground transition-colors underline"
                >
                  {profile.contact.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
