import { profile } from "@/content/content";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-sm text-foreground/60">
          <div>
            <p>Based in {profile.locations.join(", ")}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <a
              href={`https://instagram.com/${profile.contact.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {profile.contact.instagram}
            </a>
            <a
              href={`mailto:${profile.contact.email}`}
              className="hover:text-foreground transition-colors"
            >
              {profile.contact.email}
            </a>
            <a
              href={`tel:${profile.contact.phone}`}
              className="hover:text-foreground transition-colors"
            >
              {profile.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
