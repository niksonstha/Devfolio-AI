export const createDefaultPortfolio = (overrides = {}) => ({
  title: "Full-Stack Developer",
  bio: "I build reliable digital products with thoughtful UX and clean engineering.",
  contact: {
    email: "",
    phone: "",
    address: ""
  },
  socialLinks: {
    website: "",
    github: "",
    linkedin: "",
    twitter: ""
  },
  skills: ["React", "Node.js", "MongoDB"],
  projects: [
    {
      title: "Starter Project",
      description: "Describe a project that shows your impact, tools, and outcomes.",
      link: "https://github.com/your-profile/project"
    }
  ],
  experience: [
    {
      company: "Your Company",
      role: "Software Engineer",
      location: "City, Country",
      summary: "Built backend APIs, collaborated with product teams, and improved delivery quality across features.",
      duration: "2024 - Present"
    }
  ],
  education: [
    {
      institution: "Your University",
      degree: "Bachelor of Computer Science",
      duration: "2019 - 2023",
      location: "City, Country"
    }
  ],
  ...overrides
});
