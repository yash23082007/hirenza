export interface ResumeTip {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "formatting" | "content" | "ats" | "design";
}

export interface ResumeSection {
  id: string;
  title: string;
  mustInclude: boolean;
  description: string;
  tips: string[];
  exampleContent?: string;
}

export interface ResumeMistake {
  title: string;
  description: string;
  severity: "Critical" | "Common" | "Minor";
}

export const resumeTips: ResumeTip[] = [
  {
    id: "one-page",
    title: "Keep It to One Page",
    description: "For less than 10 years of experience, recruiters spend 6-7 seconds on initial scan. One page forces you to prioritize.",
    icon: "file-text",
    category: "formatting",
  },
  {
    id: "action-verbs",
    title: "Start Bullets with Action Verbs",
    description: "Use strong verbs like 'Built', 'Optimized', 'Reduced', 'Led', 'Implemented', 'Architected' instead of 'Responsible for' or 'Worked on'.",
    icon: "zap",
    category: "content",
  },
  {
    id: "quantify-impact",
    title: "Quantify Your Impact",
    description: "Add numbers: 'Reduced API latency by 40%', 'Handled 10K+ requests/sec', 'Led team of 5 engineers', 'Improved test coverage from 60% to 95%'.",
    icon: "bar-chart",
    category: "content",
  },
  {
    id: "ats-friendly",
    title: "Make It ATS-Friendly",
    description: "Use standard section headings (Experience, Education, Skills). Avoid tables, columns, headers/footers, and graphics that ATS can't parse.",
    icon: "search",
    category: "ats",
  },
  {
    id: "tailor-resume",
    title: "Tailor for Each Application",
    description: "Match keywords from the job description. If they want 'React' and 'TypeScript', make sure those exact terms appear.",
    icon: "target",
    category: "ats",
  },
  {
    id: "skills-section",
    title: "Organize Skills by Category",
    description: "Group skills: Languages (Python, Java, JavaScript), Frameworks (React, Django), Tools (Git, Docker), Databases (PostgreSQL, MongoDB).",
    icon: "grid",
    category: "formatting",
  },
  {
    id: "projects-overview",
    title: "Include 2-3 Strong Projects",
    description: "Choose projects that demonstrate relevant skills. Include tech stack, your role, and measurable outcomes.",
    icon: "code",
    category: "content",
  },
  {
    id: "clean-design",
    title: "Use Clean, Professional Design",
    description: "Single-column layout, consistent formatting, 10-12pt font, 0.5-1 inch margins. No photos, ratings, or progress bars.",
    icon: "layout",
    category: "design",
  },
  {
    id: "github-link",
    title: "Add GitHub & Portfolio Links",
    description: "Include GitHub profile (with pinned repos), personal website, or portfolio. Make sure they're up to date.",
    icon: "link",
    category: "design",
  },
  {
    id: "no-objective",
    title: "Skip the Objective Statement",
    description: "Replace 'Objective' with a brief 'Summary' only if you have 5+ years experience. Otherwise, let your experience speak.",
    icon: "x-circle",
    category: "content",
  },
];

export const resumeSections: ResumeSection[] = [
  {
    id: "contact",
    title: "Contact Information",
    mustInclude: true,
    description: "Your name, email, phone, LinkedIn, GitHub, and portfolio (if applicable).",
    tips: [
      "Use a professional email (firstname.lastname@gmail.com)",
      "Make all links clickable in the PDF",
      "Include city/state, not full address",
    ],
    exampleContent: "John Doe | john.doe@gmail.com | +1 (555) 123-4567 | linkedin.com/in/johndoe | github.com/johndoe",
  },
  {
    id: "education",
    title: "Education",
    mustInclude: true,
    description: "Degree, university, graduation year, GPA (if 3.5+), relevant coursework.",
    tips: [
      "Include GPA only if 3.5 or above",
      "Add relevant coursework for internships/new grads",
      "List honors/awards if space allows",
    ],
    exampleContent: "B.Tech in Computer Science | IIT Delhi | 2024 | CGPA: 8.5/10\nRelevant Coursework: Data Structures, Algorithms, DBMS, Operating Systems",
  },
  {
    id: "experience",
    title: "Work Experience",
    mustInclude: true,
    description: "Company, role, dates, and 3-5 bullet points per role focusing on impact.",
    tips: [
      "Use reverse chronological order",
      "Focus on achievements, not responsibilities",
      "Start each bullet with an action verb",
      "Include metrics and numbers wherever possible",
      "Tailor bullets to match job description keywords",
    ],
    exampleContent: "Software Engineer Intern | Google | May 2023 - Aug 2023\n• Built a microservice handling 10K+ requests/sec using Go and gRPC\n• Reduced deployment time by 60% through CI/CD pipeline optimization\n• Collaborated with cross-functional team of 8 engineers",
  },
  {
    id: "projects",
    title: "Projects",
    mustInclude: true,
    description: "2-3 technical projects with tech stack, description, and impact.",
    tips: [
      "Include GitHub link for each project",
      "Mention tech stack prominently",
      "Focus on what you built and the impact",
      "Choose projects relevant to the role",
    ],
    exampleContent: "E-Commerce Platform | React, Node.js, PostgreSQL, Redis\n• Built full-stack marketplace with 15+ features including real-time chat\n• Implemented Redis caching reducing page load time by 45%\n• Deployed on AWS with Docker, serving 500+ daily active users",
  },
  {
    id: "skills",
    title: "Technical Skills",
    mustInclude: true,
    description: "Categorized list of technical skills relevant to the role.",
    tips: [
      "Group by category (Languages, Frameworks, Tools, etc.)",
      "Only include skills you can discuss in an interview",
      "Match keywords from the job description",
      "Avoid progress bars or skill ratings",
    ],
    exampleContent: "Languages: Python, JavaScript, TypeScript, Java, C++, SQL\nFrameworks: React, Next.js, Node.js, Express, Django\nTools: Git, Docker, AWS, PostgreSQL, MongoDB, Redis\nConcepts: Data Structures, Algorithms, System Design, CI/CD",
  },
  {
    id: "achievements",
    title: "Achievements & Certifications",
    mustInclude: false,
    description: "Contest rankings, hackathon wins, certifications, open-source contributions.",
    tips: [
      "Include only relevant achievements",
      "Mention contest ranks (e.g., 'Top 5% on LeetCode')",
      "Add AWS/GCP/Azure certifications if applicable",
      "Open-source contributions with links",
    ],
    exampleContent: "• LeetCode: 2000+ rating, solved 500+ problems\n• Codeforces: Expert (1600+ rating)\n• AWS Certified Solutions Architect – Associate\n• Contributed to open-source project with 1K+ stars",
  },
];

export const resumeMistakes: ResumeMistake[] = [
  {
    title: "Listing Responsibilities Instead of Achievements",
    description: "'Responsible for building APIs' tells nothing. 'Built REST APIs serving 10K+ daily users' shows impact.",
    severity: "Critical",
  },
  {
    title: "Using Unprofessional Email",
    description: "partyguy2002@email.com or gamer_x@email.com won't get past HR. Use firstname.lastname@gmail.com.",
    severity: "Critical",
  },
  {
    title: "Too Many Skills Listed",
    description: "Listing 30+ skills looks desperate. Only include skills you can confidently discuss in interviews.",
    severity: "Common",
  },
  {
    title: "Generic Project Descriptions",
    description: "'Built a todo app' is too basic. Describe complexity, tech choices, and what makes it unique.",
    severity: "Common",
  },
  {
    title: "No Metrics or Numbers",
    description: "Without numbers, your achievements are hard to evaluate. Always quantify: %, $, time, scale.",
    severity: "Common",
  },
  {
    title: "Inconsistent Formatting",
    description: "Mixed fonts, inconsistent bullet points, varying date formats look unprofessional.",
    severity: "Common",
  },
  {
    title: "Spelling/Grammar Errors",
    description: "Even one typo can get your resume rejected. Proofread multiple times and use tools like Grammarly.",
    severity: "Critical",
  },
  {
    title: "Using a Photo",
    description: "In most countries, photos lead to bias. Only include if specifically required for the market.",
    severity: "Minor",
  },
  {
    title: "Writing an Objective Statement",
    description: "'Seeking a challenging role...' wastes precious space. Skip it or write a targeted summary instead.",
    severity: "Minor",
  },
  {
    title: "Not Tailoring for the Job",
    description: "Sending the same resume to every job. Match keywords and highlight relevant experience.",
    severity: "Common",
  },
];

export const atsTips = [
  {
    rule: "Use standard section headings: Experience, Education, Skills, Projects",
    reason: "ATS looks for these exact terms to categorize your resume sections",
  },
  {
    rule: "Avoid tables, columns, text boxes, and headers/footers",
    reason: "ATS parsers often can't read content in these elements",
  },
  {
    rule: "Use standard fonts: Arial, Calibri, Helvetica, Times New Roman",
    reason: "Custom fonts may not render correctly when ATS processes the file",
  },
  {
    rule: "Save as PDF unless Word is specifically requested",
    reason: "PDF preserves formatting; Word can get corrupted during upload",
  },
  {
    rule: "Include exact keyword matches from the job description",
    reason: "ATS scores your resume based on keyword frequency and relevance",
  },
  {
    rule: "Spell out acronyms at least once (e.g., 'Application Programming Interface (API)')",
    reason: "ATS may search for either the full term or the abbreviation",
  },
  {
    rule: "No images, charts, or infographics",
    reason: "ATS cannot parse visual elements and may skip the entire section",
  },
  {
    rule: "Keep file size under 1MB",
    reason: "Large files may fail to upload or parse correctly",
  },
];
