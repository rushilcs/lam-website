export interface WorkItem {
  id: string;
  title: string;
  categories: string[];
  shortDescription: string;
  coverImage?: string;
  detailContent: string;
  externalLink?: string;
  images?: string[];
  metadata?: {
    role?: string;
    team?: string;
    recognition?: string;
    responsibilities?: string;
  };
}

export interface Profile {
  name: string;
  fullName: string;
  tagline: string;
  bio: string;
  roles: string[];
  education: {
    institution: string;
    degrees: string[];
  };
  current: string;
  locations: string[];
  contact: {
    instagram: string;
    email: string;
    phone: string;
  };
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export const profile: Profile = {
  name: "Lakshmi Mulgund",
  fullName: "Lakshmi Advaithi Mulgund",
  tagline: "Visual creative focusing on stories of catharsis and personal identity through movement",
  bio: "I'm a visual creative passionate about sports and entertainment, exploring narratives of catharsis and personal identity through movement. My work spans photography, design, and storytelling, with a particular focus on capturing moments that reveal deeper emotional truths.",
  roles: ["Photographer", "Designer", "Dancer", "Comedian (to my parents)"],
  education: {
    institution: "Washington University in St. Louis",
    degrees: ["Communication Design", "Film & Media Studies (Production)"],
  },
  current: "Customer Marketing Intern @ NetApp",
  locations: ["St. Louis", "Austin", "San Jose", "Bay Area"],
  contact: {
    instagram: "@lakshmimulgund",
    email: "lakshmiadvaithi@gmail.com",
    phone: "(724)-544-5005",
  },
};

export const workItems: WorkItem[] = [
  {
    id: "1",
    title: "National Desi Dance League",
    categories: ["Graphic Design"],
    shortDescription: "Chief Marketing Officer",
    coverImage: "/nddl/header.jpeg",
    detailContent: `As Chief Marketing Officer for the National Desi Dance League, I led comprehensive marketing strategies that elevated the organization's brand presence and community engagement. My work encompassed visual identity development, digital campaigns, and strategic partnerships that brought the vibrant world of Desi dance to broader audiences.

Through innovative design systems and creative direction, I developed cohesive brand experiences across all touchpoints. The marketing initiatives I spearheaded resulted in significant growth in community participation and recognition within the dance and cultural arts space.`,
    images: [
      // Competition graphics (with names and images of dancers)
      "/nddl/portfolio/ATS - 2 copy.jpg",
      "/nddl/portfolio/BKB - 2.7 copy.jpg",
      "/nddl/portfolio/NachleDeewane - 2 copy.jpg",
      "/nddl/portfolio/QCD - 2 copy.jpg",
      "/nddl/portfolio/TBN - (Fairfax, VA) - March 14, 2026 copy.jpg",
      "/nddl/portfolio/UIUCUDAAN_FINAL copy.jpg",
      "/nddl/portfolio/NAACHAUGUSTA_FINAL copy.jpg",
      // Placings (1, 2, 3)
      // Note: Add placing images here if they exist
      // Event graphics
      "/nddl/portfolio/NAACH SHOW ORDER@1x_1-1.png",
      "/nddl/portfolio/UDAAN SHOW ORDER.png",
      "/nddl/portfolio/UDAAN show day copy.png",
      "/nddl/portfolio/naach SHOW DAY copy.png",
      "/nddl/portfolio/naachgalanight copy.png",
      "/nddl/portfolio/udaangalanight copy.png",
    ],
    metadata: {
      role: "Chief Marketing Officer",
      team: "15 Directors & 70 Staff",
      recognition: "50% Readership Increase, ACP Spread of the Year Finalist",
      responsibilities: "Editorial Design, Art Direction, Design System, Brand Strategy",
    },
  },
  {
    id: "2",
    title: "Sports Narrative",
    categories: ["Photography", "Sports"],
    shortDescription: "Documenting the emotional landscape of competitive sports",
    coverImage: "/projects/project2.png",
    detailContent: `A photographic series documenting the emotional intensity and human stories within competitive sports. This work captures both the physicality and the psychological dimensions of athletic performance.

**Approach**
Focusing on moments of triumph, struggle, and camaraderie, the series reveals the deeper narratives that unfold on and off the field.`,
  },
  {
    id: "3",
    title: "Entertainment Portraits",
    categories: ["Photography", "Portrait"],
    shortDescription: "Capturing the essence of performers and creators",
    coverImage: "/projects/project3.png",
    detailContent: `Portrait work focusing on performers, artists, and creators in the entertainment industry. Each portrait seeks to reveal the authentic person behind the public persona.

**Style**
Clean, editorial approach with emphasis on natural lighting and authentic expression.`,
  },
  {
    id: "4",
    title: "Design Systems",
    categories: ["Design", "Branding"],
    shortDescription: "Visual identity and design systems for creative projects",
    coverImage: "/projects/project4.png",
    detailContent: `Development of visual identity systems and design languages for various creative projects. This work combines strategic thinking with aesthetic sensibility.

**Focus**
Creating cohesive visual systems that communicate clearly while maintaining creative integrity.`,
  },
  {
    id: "5",
    title: "Film Production",
    categories: ["Film", "Production"],
    shortDescription: "Short films exploring personal narratives",
    coverImage: "/projects/project5.png",
    detailContent: `Short film projects that explore personal narratives and emotional journeys. These works combine visual storytelling with narrative depth.

**Themes**
Catharsis, identity, movement, and the spaces between public and private experience.`,
  },
  {
    id: "6",
    title: "Editorial Photography",
    categories: ["Photography", "Editorial"],
    shortDescription: "Editorial work for publications and brands",
    coverImage: "/projects/project6.png",
    detailContent: `Editorial photography work that combines storytelling with commercial sensibility. Projects range from feature stories to brand campaigns.

**Approach**
Balancing creative vision with editorial requirements, creating images that serve both narrative and commercial purposes.`,
  },
  {
    id: "7",
    title: "Visual Storytelling",
    categories: ["Photography", "Documentary"],
    shortDescription: "Documentary-style visual narratives",
    coverImage: "/projects/project7.png",
    detailContent: `Long-form visual storytelling projects that document real experiences and communities. These works aim to capture authentic moments and preserve meaningful stories.

**Method**
Immersive, patient approach to documentation, allowing stories to unfold naturally.`,
  },
  {
    id: "8",
    title: "Creative Direction",
    categories: ["Design", "Direction"],
    shortDescription: "Creative direction for multimedia projects",
    coverImage: "/projects/project8.png",
    detailContent: `Creative direction for projects spanning photography, video, and design. This work involves conceptual development, visual planning, and execution across multiple media.

**Scope**
From initial concept through final delivery, ensuring cohesive creative vision across all touchpoints.`,
  },
];

export const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    src: "/projects/project1.png",
    alt: "Gallery image 1",
  },
  {
    id: "g2",
    src: "/projects/project2.png",
    alt: "Gallery image 2",
  },
  {
    id: "g3",
    src: "/projects/project3.png",
    alt: "Gallery image 3",
  },
  {
    id: "g4",
    src: "/projects/project4.png",
    alt: "Gallery image 4",
  },
  {
    id: "g5",
    src: "/projects/project5.png",
    alt: "Gallery image 5",
  },
  {
    id: "g6",
    src: "/projects/project6.png",
    alt: "Gallery image 6",
  },
  {
    id: "g7",
    src: "/projects/project7.png",
    alt: "Gallery image 7",
  },
  {
    id: "g8",
    src: "/projects/project8.png",
    alt: "Gallery image 8",
  },
];
