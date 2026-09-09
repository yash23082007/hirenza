// Re-export all data modules
export { dsaSheets, getAllProblems, type Problem, type DSASheet } from './dsaSheets';
export { companies, type Company, type CompanyProblem } from './companies';
export { dsaPatterns, type Pattern } from './patterns';
export { sqlQuestions, type SQLQuestion } from './sqlQuestions';
export { systemDesignTopics, systemDesignCategories, type SystemDesignTopic } from './systemDesign';
export { coreSubjectsData, type CoreSubjectQuestion } from './coreSubjects';
export { packageWiseData, packageRanges, type PackageWiseProblem } from './packageWise';
export { interviewQuestionsData, type TechQuestion } from './interviewQuestions';
export { hrQuestionsData, type HRQuestion } from './hrQuestions';
export { roleWiseData, type RoleSkill, type RoleData } from './roleSkills';
export { notesContent, type NoteContent, type NoteSection } from './notesContent';
export { codingProblems, codingContests, practiceRecommendations, type CodingProblem, type CodingContest } from './codingPractice';
export { resumeTips, resumeSections, resumeMistakes, atsTips, type ResumeTip, type ResumeSection, type ResumeMistake } from './resumeData';
export { interviewExperiencesData, type InterviewExperience as InterviewExperienceData } from './interviewExperiencesData';

// Question type for QuestionList component
export interface Question {
  id: number | string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  completed: boolean;
  bookmarked: boolean;
  topic?: string;
  urls?: { label: string; href: string }[];
  approach?: string;
  complexity?: { time: string; space: string };
  hint?: string;
}

// Roles data
export interface Role {
  id: string;
  name: string;
  questions: number;
  description: string;
  group: string;
  skills?: string[];
}

export const roles: Role[] = [
  { id: "frontend", name: "Frontend Developer", questions: 210, description: "React, Next.js, TypeScript, CSS, and modern web technologies", group: "Development", skills: ["HTML/CSS", "JavaScript", "React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"] },
  { id: "backend", name: "Backend Developer", questions: 150, description: "APIs, databases, server-side architecture, and system design", group: "Development", skills: ["Node.js", "Express", "REST APIs", "GraphQL", "PostgreSQL", "MongoDB", "Redis"] },
  { id: "fullstack", name: "Fullstack Developer", questions: 510, description: "Complete frontend and backend development skills", group: "Development", skills: ["React", "Node.js", "TypeScript", "Databases", "API Design", "Deployment"] },
  { id: "mobile", name: "Mobile Developer", questions: 500, description: "Android, iOS, React Native, Flutter development", group: "Development", skills: ["React Native", "Swift", "Kotlin", "Flutter", "Dart", "Mobile Architecture"] },
  { id: "game-dev", name: "Game Developer", questions: 600, description: "Unity, Unreal Engine, game physics, and AAA development", group: "Development", skills: ["Unity", "Unreal Engine", "C#", "C++", "Game Physics", "3D Math"] },
  { id: "web3", name: "Web3 Developer", questions: 570, description: "Blockchain, smart contracts, DeFi, and decentralized apps", group: "Development", skills: ["Solidity", "Ethereum", "Smart Contracts", "Web3.js", "IPFS", "DeFi Protocols"] },
  { id: "embedded", name: "Embedded Systems Engineer", questions: 450, description: "IoT, microcontrollers, RTOS, and embedded software", group: "Development", skills: ["C/C++", "RTOS", "ARM", "IoT Protocols", "Hardware Interfaces", "Debugging"] },
  { id: "data-analyst", name: "Data Analyst", questions: 225, description: "SQL, data visualization, statistics, and business intelligence", group: "Data & AI/ML", skills: ["SQL", "Python", "Tableau", "Statistics", "Excel", "Power BI"] },
  { id: "data-engineer", name: "Data Engineer", questions: 300, description: "ETL pipelines, data warehousing, Apache Spark, and big data", group: "Data & AI/ML", skills: ["Apache Spark", "Airflow", "Kafka", "Data Warehousing", "ETL", "Python/Scala"] },
  { id: "data-scientist", name: "Data Scientist", questions: 450, description: "Machine learning, statistics, Python, and predictive modeling", group: "Data & AI/ML", skills: ["Python", "R", "Machine Learning", "Statistics", "TensorFlow", "Data Analysis"] },
  { id: "ai-engineer", name: "AI Engineer", questions: 150, description: "Deep learning, neural networks, computer vision, NLP", group: "Data & AI/ML", skills: ["PyTorch", "TensorFlow", "Deep Learning", "NLP", "Computer Vision", "MLOps"] },
  { id: "ml-engineer", name: "ML/AI Engineer", questions: 400, description: "ML systems, model deployment, MLOps, production systems", group: "Data & AI/ML", skills: ["ML Pipelines", "Model Deployment", "Feature Engineering", "A/B Testing", "MLflow"] },
  { id: "llm-engineer", name: "LLM / GenAI Engineer", questions: 260, description: "Large language models, prompt engineering, RAG, generative AI", group: "Data & AI/ML", skills: ["LLMs", "Prompt Engineering", "RAG", "LangChain", "Fine-tuning", "Vector Databases"] },
  { id: "devops", name: "DevOps Engineer", questions: 400, description: "CI/CD, Docker, Kubernetes, infrastructure automation", group: "DevOps & Cloud", skills: ["Docker", "Kubernetes", "CI/CD", "Terraform", "Ansible", "Linux"] },
  { id: "cloud", name: "Cloud Engineer", questions: 550, description: "AWS, Azure, GCP, cloud architecture, cloud-native apps", group: "DevOps & Cloud", skills: ["AWS", "Azure", "GCP", "Cloud Architecture", "Serverless", "VPC"] },
  { id: "sre", name: "Site Reliability Engineer", questions: 400, description: "System reliability, monitoring, incident response, operations", group: "DevOps & Cloud", skills: ["Monitoring", "Incident Response", "Automation", "Performance Tuning", "Capacity Planning"] },
  { id: "security", name: "Cloud Security Engineer", questions: 580, description: "Cloud security, IAM, compliance, threat detection", group: "Security & QA", skills: ["IAM", "Encryption", "Compliance", "Threat Detection", "SIEM", "Zero Trust"] },
  { id: "cybersecurity", name: "Cybersecurity Analyst", questions: 475, description: "Network security, penetration testing, vulnerability assessment", group: "Security & QA", skills: ["Pen Testing", "Firewalls", "IDS/IPS", "Vulnerability Scanning", "SIEM", "Incident Response"] },
  { id: "qa", name: "QA / SDET Engineer", questions: 565, description: "Test automation, Selenium, API testing, quality assurance", group: "Security & QA", skills: ["Selenium", "Cypress", "Jest", "API Testing", "Performance Testing", "Test Strategy"] },
];

// Playlists data
export interface Playlist {
  id: string;
  title: string;
  thumbnail: string;
  videos: number;
  description?: string;
  url: string;
  author?: string;
  gradient?: string;
  tag?: string;
}

export const dsaPlaylists: Playlist[] = [
  {
    id: "lovebabbar",
    title: "Love Babbar Complete C++ & DSA Course",
    thumbnail: "LB",
    videos: 148,
    author: "Love Babbar",
    gradient: "from-blue-600 via-indigo-600 to-purple-700",
    tag: "C++ & DSA",
    description: "Complete DSA placement preparation series covering basics to advanced trees, graphs, DP, and triage.",
    url: "https://www.youtube.com/playlist?list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA"
  },
  {
    id: "shradha",
    title: "Apna College Complete Java & DSA Course",
    thumbnail: "SK",
    videos: 120,
    author: "Shradha Khapra",
    gradient: "from-purple-600 via-pink-600 to-rose-600",
    tag: "Java & DSA",
    description: "Structured beginner-friendly DSA course by Shradha Khapra covering fundamentals to hard interview patterns.",
    url: "https://www.youtube.com/playlist?list=PLfqMhTWNBTe0b2nM6JHVCnAkhQRGiZMSJ"
  },
  {
    id: "rohit",
    title: "Coder Army 180 Days of Code (DSA in C++)",
    thumbnail: "RN",
    videos: 180,
    author: "Rohit Negi",
    gradient: "from-emerald-600 via-teal-600 to-cyan-700",
    tag: "Comprehensive DSA",
    description: "In-depth 180 days structured DSA challenge by Rohit Negi (IIT Guwahati) with extensive problem breakdowns.",
    url: "https://www.youtube.com/@CoderArmy9/playlists"
  },
  {
    id: "striver",
    title: "Striver's TakeUForward A2Z DSA Series",
    thumbnail: "S",
    videos: 455,
    author: "Raj Vikramaditya (Striver)",
    gradient: "from-red-600 via-orange-600 to-amber-600",
    tag: "A2Z Masterclass",
    description: "Industry benchmark A-to-Z DSA syllabus with video solutions, intuition, and optimal space/time complexity.",
    url: "https://takeuforward.org/strivers-a2z-dsa-course-sheet-2"
  },
  {
    id: "arsh-goyal",
    title: "Arsh Goyal 6 Companies 30 Days & High-Freq DSA",
    thumbnail: "AG",
    videos: 280,
    author: "Arsh Goyal",
    gradient: "from-violet-600 via-purple-700 to-indigo-800",
    tag: "Placement Prep",
    description: "High-frequency DSA problems curated from real on-campus and off-campus technical rounds at top tech companies.",
    url: "https://www.youtube.com/@ArshGoyalTech/playlists"
  },
  {
    id: "neetcode",
    title: "NeetCode 150 & Blind 75 Visual Solutions",
    thumbnail: "NC",
    videos: 150,
    author: "NeetCode",
    gradient: "from-cyan-600 via-blue-600 to-indigo-700",
    tag: "Pattern Based",
    description: "Visual problem-solving and algorithmic intuition across the essential 20 coding interview patterns.",
    url: "https://neetcode.io/practice"
  },
];

export const systemDesignPlaylists: Playlist[] = [
  {
    id: "hld",
    title: "High-Level System Design Primer",
    thumbnail: "HLD",
    videos: 32,
    author: "Donne Martin & Primer Community",
    gradient: "from-blue-700 via-indigo-800 to-slate-900",
    tag: "HLD Architecture",
    description: "Learn how to design large-scale distributed systems. Scalability, availability, CAP theorem, and caching.",
    url: "https://github.com/donnemartin/system-design-primer"
  },
  {
    id: "lld",
    title: "Low-Level Design & Design Patterns",
    thumbnail: "LLD",
    videos: 28,
    author: "Refactoring Guru",
    gradient: "from-emerald-700 via-teal-800 to-slate-900",
    tag: "OOP & LLD",
    description: "Master Creational, Structural, and Behavioral Gang of Four (GoF) design patterns with clean object-oriented code.",
    url: "https://refactoring.guru/design-patterns"
  },
  {
    id: "distributed",
    title: "Patterns of Distributed Systems",
    thumbnail: "DS",
    videos: 24,
    author: "Martin Fowler & Unmesh Joshi",
    gradient: "from-purple-700 via-violet-800 to-slate-900",
    tag: "Distributed Systems",
    description: "Deep dive into consensus algorithms (Raft, Paxos), leader election, replication, and distributed transactions.",
    url: "https://martinfowler.com/articles/patterns-of-distributed-systems/"
  },
  {
    id: "scalable-api",
    title: "Scalable API Design & Microservices",
    thumbnail: "API",
    videos: 20,
    author: "Chris Richardson (Microservices.io)",
    gradient: "from-amber-600 via-orange-700 to-slate-900",
    tag: "Microservices",
    description: "Patterns for decomposing monoliths, API Gateways, Saga pattern, CQRS, and asynchronous event streams.",
    url: "https://microservices.io/patterns/index.html"
  },
  {
    id: "databases",
    title: "Database Indexing & Internals (Use The Index, Luke)",
    thumbnail: "DB",
    videos: 26,
    author: "Markus Winand",
    gradient: "from-sky-700 via-blue-800 to-slate-900",
    tag: "DB Internals",
    description: "B-Trees, LSM-Trees, execution plans, partitioning, query optimization, and transaction isolation levels.",
    url: "https://use-the-index-luke.com/"
  },
  {
    id: "caching",
    title: "Modern In-Memory Caching & Redis Patterns",
    thumbnail: "C",
    videos: 18,
    author: "Redis University & Docs",
    gradient: "from-rose-700 via-red-800 to-slate-900",
    tag: "Caching",
    description: "Cache-Aside, Write-Through, Write-Behind, eviction policies (LRU/LFU), Cache Stampede, and CDN strategies.",
    url: "https://redis.io/docs/latest/develop/use/patterns-and-approaches/"
  },
];

// Technologies data
export interface Technology {
  id: string;
  name: string;
  questions: number;
  description: string;
  color: string;
  group: string;
}

export const technologies: Technology[] = [
  { id: "javascript", name: "JavaScript", questions: 15, description: "Core JS, ES6+, async/await, closures, prototypes", color: "#F7DF1E", group: "Web Development" },
  { id: "typescript", name: "TypeScript", questions: 15, description: "Type safety, generics, utility types, advanced patterns", color: "#3178C6", group: "Web Development" },
  { id: "react", name: "React.js", questions: 15, description: "Hooks, state management, patterns, performance optimization", color: "#61DAFB", group: "Web Development" },
  { id: "node", name: "Node.js", questions: 15, description: "Backend development, Express, middleware, streams", color: "#339933", group: "Web Development" },
  { id: "python", name: "Python", questions: 15, description: "Pythonic syntax, decorators, generators, OOP, internals", color: "#3776AB", group: "Programming Languages" },
  { id: "dbms", name: "DBMS", questions: 10, description: "Database management systems, SQL, normalization, transactions", color: "#4479A1", group: "Core Subjects" },
  { id: "os", name: "OS", questions: 10, description: "Operating systems concepts, processes, memory management", color: "#F5A623", group: "Core Subjects" },
  { id: "cn", name: "Computer Networks", questions: 10, description: "Networking protocols, OSI model, TCP/IP", color: "#00BCD4", group: "Core Subjects" },
  { id: "aws", name: "AWS", questions: 10, description: "Amazon Web Services: EC2, S3, Lambda, DynamoDB", color: "#FF9900", group: "DevOps & Cloud" },
  { id: "docker", name: "Docker", questions: 10, description: "Containerization, Docker Compose, multi-stage builds", color: "#2496ED", group: "DevOps & Cloud" },
];

// Email templates data
export interface EmailTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
}

export const emailTemplates: EmailTemplate[] = [
  {
    id: "frontend-referral",
    title: "Frontend Developer – Job Referral Request",
    description: "Professional template for frontend role referrals",
    category: "Frontend",
    content: `Subject: Frontend Developer Role at [Company] - Referral Request

Hi [Name],

I hope you're doing well. I'm [Your Name], a frontend developer with [X years] of experience in React, TypeScript, and modern web technologies.

I came across the Frontend Developer position at [Company] and I'm very interested. Given your experience there, I'd greatly appreciate if you could refer me for this role.

I've attached my resume and here's a quick summary of my relevant experience:
- [Key achievement 1]
- [Key achievement 2]
- [Key achievement 3]

I'd be happy to provide any additional information. Thank you for your time!

Best regards,
[Your Name]
[LinkedIn URL]
[Portfolio/GitHub URL]`,
  },
  {
    id: "backend-referral",
    title: "Backend Developer – Job Referral Request",
    description: "Template for backend engineering referrals",
    category: "Backend",
    content: `Subject: Backend Developer Opportunity at [Company] - Referral

Hi [Name],

I'm [Your Name], a backend engineer specializing in [Node.js/Python/Java] with experience building scalable APIs and microservices.

I noticed [Company] is hiring for a Backend Developer role, and I believe my background in [specific skills] aligns well with the position.

Would you be open to referring me? I've attached my resume and a brief overview:
- [Key technical achievement]
- [Relevant project or impact]
- [Years of experience and core skills]

Happy to chat further at your convenience. Thanks for considering!

Best,
[Your Name]`,
  },
  {
    id: "devops-referral",
    title: "DevOps Engineer – Job Referral Request",
    description: "DevOps role referral template",
    category: "Cloud & DevOps",
    content: `Subject: DevOps Engineer Position at [Company] - Referral

Hi [Name],

I'm [Your Name], a DevOps engineer with strong experience in CI/CD, Kubernetes, and cloud infrastructure (AWS/GCP).

I'm very interested in the DevOps Engineer role at [Company]. Your referral would mean a lot.

Quick highlights:
- [Infrastructure achievement]
- [Automation or CI/CD accomplishment]
- [Relevant certifications]

Resume attached. Happy to provide more details anytime.

Thanks,
[Your Name]`,
  },
  {
    id: "data-referral",
    title: "Data Engineer – Job Referral Request",
    description: "Data engineering referral template",
    category: "Data & AI/ML",
    content: `Subject: Data Engineer Role at [Company] - Referral Request

Hi [Name],

I'm [Your Name], a data engineer with experience in ETL pipelines, Apache Spark, and data warehousing.

I saw the Data Engineer opening at [Company] and would love to be referred. My relevant background:
- [Data pipeline achievement]
- [Relevant tools and technologies]
- [Impact metrics]

Resume attached. Would appreciate your help!

Best,
[Your Name]`,
  },
  {
    id: "networking-general",
    title: "General Networking – Connection Request",
    description: "Template for professional networking on LinkedIn",
    category: "Networking & Learning",
    content: `Hi [Name],

I came across your profile and was impressed by your work in [specific field/project]. I'm currently [your situation - e.g., "a final year CS student passionate about backend development"].

I'd love to connect and learn from your journey. No immediate ask — just hoping to be part of your network.

Best,
[Your Name]`,
  },
  {
    id: "informational-interview",
    title: "Informational Interview Request",
    description: "Request for career advice conversation",
    category: "Networking & Learning",
    content: `Subject: 15-min Chat About [Topic]?

Hi [Name],

I'm [Your Name], a [your role/student status] interested in [specific area]. I noticed your experience at [Company] in [relevant domain] and would love to learn from your perspective.

Would you be open to a 15-minute chat sometime in the next few weeks? I have specific questions about:
1. [Question 1]
2. [Question 2]

I promise to keep it brief and respect your time. Thank you for considering!

Best regards,
[Your Name]`,
  },
];

// Notes data
export interface Note {
  id: string;
  title: string;
  pages: number;
  category: string;
  description: string;
}

export const notes: Note[] = [
  { id: "computer-networks", title: "Computer Networks", pages: 45, category: "Core", description: "OSI Model, TCP/IP, HTTP/HTTPS, DNS, routing protocols" },
  { id: "aws", title: "AWS", pages: 60, category: "Cloud", description: "EC2, S3, Lambda, VPC, IAM, CloudFormation" },
  { id: "java", title: "Java", pages: 55, category: "Language", description: "OOP, Collections, Streams, Multithreading, JVM" },
  { id: "kubernetes", title: "Kubernetes", pages: 40, category: "DevOps", description: "Pods, Deployments, Services, Ingress, Helm" },
  { id: "docker", title: "Docker", pages: 30, category: "DevOps", description: "Images, Containers, Dockerfile, Compose, Networking" },
  { id: "dbms", title: "DBMS", pages: 50, category: "Core", description: "Normalization, ACID, Transactions, Indexing, Joins" },
  { id: "operating-systems", title: "Operating Systems", pages: 48, category: "Core", description: "Processes, Threads, Memory Management, Scheduling" },
  { id: "system-design", title: "System Design", pages: 70, category: "Design", description: "Scalability, Load Balancing, Caching, Databases" },
];

// Resume templates data
export interface ResumeTemplate {
  id: string;
  name: string;
  style: string;
  description: string;
  tags: string[];
  overleafUrl?: string;
  githubUrl?: string;
  markdownCode: string;
  latexCode: string;
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: "jakes-resume",
    name: "Jake's Resume (FAANG Benchmark)",
    style: "LaTeX Clean Standard",
    description: "The gold standard single-column ATS resume used by successful candidates at Google, Meta, and Amazon.",
    tags: ["ATS-Score: 98/100", "Single-Column", "LaTeX", "FAANG"],
    overleafUrl: "https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs",
    githubUrl: "https://github.com/jakegut/resume",
    markdownCode: `# FIRSTNAME LASTNAME
**Email:** candidate@email.com | **Phone:** +1 (555) 123-4567 | **LinkedIn:** linkedin.com/in/username | **GitHub:** github.com/username

---

### EDUCATION
**University of Technology** — *Bachelor of Science in Computer Science* (GPA: 3.9/4.0) | *2021 – 2025*
- Coursework: Data Structures & Algorithms, Distributed Systems, Computer Networks, Database Management

---

### EXPERIENCE
**Software Engineering Intern** — *Tech Enterprise Inc.* | *May 2024 – Aug 2024*
- Architected and deployed microservices using Go and gRPC, reducing API response latency by **38%**.
- Integrated Redis caching layer serving **12,000+ RPS** during high-concurrency peak loads.
- Designed automated CI/CD workflows with Docker & GitHub Actions, cutting release cycles from 4 hours to **20 minutes**.

**Software Developer Intern** — *Cloud Solutions Corp* | *Jan 2024 – Apr 2024*
- Developed responsive frontend modules in Next.js & TypeScript, improving Lighthouse performance score to **99**.
- Implemented WebSocket real-time notification engine supporting **5,000+ concurrent connections**.

---

### PROJECTS
**Distributed Key-Value Store** | *Go, Raft, gRPC, Docker*
- Engineered a fault-tolerant distributed key-value store using Raft consensus protocol with leader election and log replication.
- Benchmarked throughput exceeding **25,000 QPS** with sub-5ms tail latency under network partitioning simulation.

**Full-Stack E-Commerce Engine** | *Next.js, TypeScript, PostgreSQL, Prisma, Stripe*
- Built full-featured web store with server-side rendering, secure payments, and role-based access control.
- Handled transactions for 500+ daily active users with 99.98% uptime.

---

### TECHNICAL SKILLS
- **Languages:** Go, Python, TypeScript, JavaScript, Java, C++, SQL
- **Frameworks & Libraries:** React, Next.js, Node.js, Express, TailwindCSS, PyTorch
- **Cloud & DevOps:** AWS (EC2, S3, RDS), Docker, Kubernetes, Git, CI/CD, Linux, Redis
`,
    latexCode: `%-------------------------
% Resume in Latex
% Author : Jake Gutierrez
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\pdfgentounicode=1

\\begin{document}

\\begin{center}
    \\textbf{\\Huge \\scshape Firstname Lastname} \\\\ \\vspace{1pt}
    \\small 123-456-7890 $|$ \\href{mailto:candidate@email.com}{\\underline{candidate@email.com}} $|$ 
    \\href{https://linkedin.com/in/username}{\\underline{linkedin.com/in/username}} $|$
    \\href{https://github.com/username}{\\underline{github.com/username}}
\\end{center}

\\section{Education}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {University Name}{City, State}
      {Bachelor of Science in Computer Science; GPA: 3.9}{Aug. 2021 -- May 2025}
  \\resumeSubHeadingListEnd

\\section{Experience}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {Software Engineer Intern}{May 2024 -- Aug. 2024}
      {Tech Enterprise Inc.}{City, State}
      \\resumeItemListStart
        \\resumeItem{Architected and deployed microservices in Go and gRPC, reducing API latency by 38\\%.}
        \\resumeItem{Implemented Redis caching serving 12,000+ RPS during peak traffic loads.}
        \\resumeItem{Constructed automated CI/CD pipeline using Docker, shortening deployment time by 60\\%.}
      \\resumeItemListEnd
  \\resumeSubHeadingListEnd

\\section{Projects}
  \\resumeSubHeadingListStart
    \\resumeProjectHeading
      {\\textbf{Distributed Key-Value Store} $|$ \\emph{Go, Raft, gRPC, Docker}}{Jan. 2024 -- Present}
      \\resumeItemListStart
        \\resumeItem{Engineered a fault-tolerant distributed store using Raft consensus for leader election.}
        \\resumeItem{Benchmarked throughput exceeding 25,000 QPS with sub-5ms tail latency.}
      \\resumeItemListEnd
  \\resumeSubHeadingListEnd

\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}{: Go, Python, TypeScript, JavaScript, Java, C++, SQL} \\\\
     \\textbf{Technologies}{: React, Next.js, Node.js, Docker, Kubernetes, AWS, Redis, PostgreSQL}
    }}
 \\end{itemize}

\\end{document}
`
  },
  {
    id: "modern-minimal",
    name: "Modern Minimalist (Software Engineer)",
    style: "Clean Modern",
    description: "Typography-focused, highly scannable design optimized for recruiter screeners and automated parsing.",
    tags: ["ATS-Score: 96/100", "High-Impact", "Fullstack", "Modern"],
    overleafUrl: "https://www.overleaf.com/latex/templates/tagged/cv",
    githubUrl: "https://github.com/jakegut/resume",
    markdownCode: `# FIRSTNAME LASTNAME
Software Engineer | candidate@email.com | +1 555-0199 | San Francisco, CA | github.com/username

### SUMMARY
Performance-driven Software Engineer with proven experience in full-stack architecture, distributed systems, and real-time web applications.

### SKILLS
- **Core Languages:** TypeScript, Python, Go, C++, SQL
- **Web & Backend:** Next.js, React, Node.js, Express, FastAPI, GraphQL, gRPC
- **Infrastructure:** Docker, Kubernetes, AWS (S3, ECS, Lambda), Terraform, PostgreSQL, Redis

### WORK EXPERIENCE
**Software Engineer** — SaaS Platforms Co | *2023 – Present*
- Scaled distributed multi-tenant API serving **30M+ monthly requests** across 4 global regions.
- Optimized database queries and indexed foreign keys, dropping p99 query duration from **850ms to 42ms**.
- Mentored 4 junior engineers on test-driven development and TypeScript type safety.
`,
    latexCode: `\\documentclass[10pt,letterpaper]{article}
\\usepackage[margin=0.75in]{geometry}
\\usepackage{hyperref}
\\pagestyle{empty}
\\begin{document}
\\textbf{\\Large Firstname Lastname}\\\\
San Francisco, CA $|$ \\href{mailto:candidate@email.com}{candidate@email.com} $|$ \\href{https://github.com/username}{github.com/username}
\\section*{Experience}
\\textbf{Software Engineer}, SaaS Platforms Co \\hfill 2023 -- Present\\\\
\\begin{itemize}
  \\item Scaled distributed multi-tenant API serving 30M+ monthly requests.
  \\item Optimized PostgreSQL queries dropping p99 latency from 850ms to 42ms.
\\end{itemize}
\\end{document}`
  },
  {
    id: "technical-deep",
    name: "Technical Systems Focus",
    style: "Deep Engineering",
    description: "Tailored for Systems, Backend, and Infrastructure engineering roles with emphasis on metrics and architecture.",
    tags: ["ATS-Score: 97/100", "Backend", "Distributed Systems", "Infra"],
    overleafUrl: "https://www.overleaf.com/latex/templates/tagged/cv",
    githubUrl: "https://github.com/jakegut/resume",
    markdownCode: `# FIRSTNAME LASTNAME — SYSTEMS & BACKEND ENGINEER
Email: engineer@domain.com | Mobile: +1 (555) 432-1098 | GitHub: github.com/engineer | LinkedIn: linkedin.com/in/engineer

### CORE EXPERTISE
Distributed Systems, High-Throughput Concurrency, Linux Kernel Internals, Storage Engines, Observability

### TECHNICAL EXPERIENCE
**Systems Engineer** — InfraCore Technologies | *2022 – Present*
- Designed an LSM-tree based persistent storage layer in C++ processing **100K write operations per second**.
- Automated cluster health monitoring with Prometheus & Grafana, preventing SLA breaches.
`,
    latexCode: `\\documentclass[11pt]{article}
\\usepackage{fullpage}
\\begin{document}
\\textbf{\\LARGE Firstname Lastname}\\\\
Systems Engineer $|$ engineer@domain.com $|$ github.com/engineer
\\section*{Engineering Experience}
\\textbf{InfraCore Technologies} -- Systems Engineer \\hfill 2022 -- Present\\\\
Designed LSM-tree persistent storage in C++ processing 100K write ops/sec.
\\end{document}`
  }
];

// FAQ data
export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqItems: FAQItem[] = [
  { question: "What does Hirenza offer?", answer: "Hirenza is a complete interview preparation workspace bringing together DSA sheets, company-wise questions, SQL practice, system design resources, study notes, cold email templates, and resume tools — all in one focused platform.", category: "Features & Functionality" },
  { question: "Is Hirenza free?", answer: "Yes, Hirenza is completely free. All resources, sheets, and tools are available at no cost. We believe interview preparation should be accessible to everyone.", category: "Account" },
  { question: "Can I track my interview preparation?", answer: "Yes. The dashboard includes activity tracking, streak calendars, skill analysis, and category breakdowns so you can monitor your consistency and progress over time.", category: "Features & Functionality" },
  { question: "Can I save and bookmark questions?", answer: "Absolutely. You can bookmark any question across all sheets and resources. Bookmarked questions are easily accessible from your saved questions section.", category: "Features & Functionality" },
  { question: "Can I access notes directly?", answer: "Yes. All study notes are available directly in the platform — no downloading or searching required. Open PDFs right within the app.", category: "Content & Resources" },
  { question: "How do I use the DSA sheets?", answer: "Navigate to the DSA Sheets section, choose an educator's sheet (Striver, Love Babbar, NeetCode, etc.), and start solving problems in order. Mark questions as completed, track progress, and use bookmarks for revision.", category: "Content & Resources" },
  { question: "Does Hirenza support different roles?", answer: "Yes. We have role-wise preparation for 20+ tech roles including Frontend, Backend, Fullstack, Mobile, DevOps, Data Science, AI/ML, Cloud, Security, and more.", category: "Career Preparation" },
  { question: "Can I switch between dark and light mode?", answer: "Yes. Use the theme toggle in the navigation bar to switch between dark and light modes. Your preference is saved automatically.", category: "Features & Functionality" },
  { question: "Do you provide resume templates?", answer: "Yes. We offer multiple ATS-friendly resume templates designed for different roles and experience levels. Preview and download them directly.", category: "Career Preparation" },
  { question: "How can I contribute to Hirenza?", answer: "You can contribute by joining our community, sharing interview experiences, suggesting resources, or contributing to open-source features. Visit the Community page to get started.", category: "Community" },
];

// Interview experience data
export interface InterviewExperience {
  id: string;
  company: string;
  role: string;
  level: "Intern" | "SDE 1" | "SDE 2" | "Senior";
  rounds: {
    name: string;
    description: string;
    duration?: string;
  }[];
  topics: string[];
  difficulty: "Easy" | "Medium" | "Hard";
}

export const interviewExperiences: InterviewExperience[] = [
  {
    id: "google-sde1",
    company: "Google",
    role: "SDE 1",
    level: "SDE 1",
    rounds: [
      { name: "Online Assessment", description: "2 coding problems (1 Medium, 1 Hard) in 90 minutes", duration: "90 min" },
      { name: "Technical Round 1", description: "2 DSA problems focusing on arrays/graphs, 1 system design discussion", duration: "45 min" },
      { name: "Technical Round 2", description: "2 DSA problems (trees/DP), code review exercise", duration: "45 min" },
      { name: "Technical Round 3", description: "System design (distributed systems), behavioral questions", duration: "60 min" },
      { name: "Team Match / Hiring Committee", description: "Review of all rounds, team matching", duration: "1-2 weeks" },
    ],
    topics: ["Arrays", "Trees", "Graphs", "Dynamic Programming", "System Design", "Behavioral"],
    difficulty: "Hard",
  },
  {
    id: "amazon-sde1",
    company: "Amazon",
    role: "SDE 1",
    level: "SDE 1",
    rounds: [
      { name: "Online Assessment", description: "2 coding problems + work simulation + leadership principles", duration: "120 min" },
      { name: "Technical Round 1", description: "2 DSA problems, focus on data structures and problem-solving approach", duration: "45-60 min" },
      { name: "Technical Round 2", description: "2 DSA problems + system design (low level), object-oriented design", duration: "45-60 min" },
      { name: "Loop (Virtual Onsite)", description: "3-4 rounds: coding, system design, behavioral (Leadership Principles)", duration: "4-5 hours" },
    ],
    topics: ["Arrays", "Strings", "Trees", "HashMaps", "OOP Design", "Leadership Principles"],
    difficulty: "Medium",
  },
  {
    id: "microsoft-sde1",
    company: "Microsoft",
    role: "SDE 1",
    level: "SDE 1",
    rounds: [
      { name: "Online Assessment", description: "2 coding problems on HackerRank, 30 min each", duration: "60 min" },
      { name: "Technical Round 1", description: "2-3 DSA problems with focus on clean code and edge cases", duration: "45 min" },
      { name: "Technical Round 2", description: "System design (HLD/LLD), architecture discussion", duration: "45 min" },
      { name: "Technical Round 3", description: "Advanced DSA + problem-solving approach discussion", duration: "45 min" },
      { name: "As/Appropriateness Round", description: "Culture fit, team collaboration, behavioral questions", duration: "30 min" },
    ],
    topics: ["Arrays", "Strings", "Trees", "System Design", "Clean Code", "Behavioral"],
    difficulty: "Medium",
  },
  {
    id: "meta-sde1",
    company: "Meta",
    role: "SDE 1",
    level: "SDE 1",
    rounds: [
      { name: "Online Assessment", description: "2 coding problems, 30 min each", duration: "60 min" },
      { name: "Technical Round 1", description: "2 medium-hard coding problems in 45 min. Speed is critical.", duration: "45 min" },
      { name: "Technical Round 2", description: "2 medium-hard coding problems in 45 min. Focus on optimal solution.", duration: "45 min" },
      { name: "Behavioral Round", description: "Meta values, past projects, collaboration examples", duration: "30 min" },
    ],
    topics: ["Arrays", "Strings", "Graphs", "Dynamic Programming", "Speed & Accuracy"],
    difficulty: "Hard",
  },
];
