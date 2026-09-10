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
    id: "gaurav-sen",
    title: "Gaurav Sen System Design & Distributed Systems",
    thumbnail: "GS",
    videos: 36,
    author: "Gaurav Sen",
    gradient: "from-blue-700 via-indigo-800 to-slate-900",
    tag: "HLD Architecture",
    description: "Foundational high-level system design lessons on message brokers, consistent hashing, load balancers, and distributed cache architecture.",
    url: "https://www.youtube.com/@gkcs"
  },
  {
    id: "exponent",
    title: "Exponent Real System Design Mock Interviews",
    thumbnail: "EX",
    videos: 42,
    author: "Exponent",
    gradient: "from-purple-700 via-violet-800 to-slate-900",
    tag: "FAANG Mocks",
    description: "Full-length mock interviews breaking down real-world architectural design questions asked at Google, Meta, and Uber.",
    url: "https://www.youtube.com/@tryexponent"
  },
  {
    id: "hello-interview",
    title: "Hello Interview Deep Dive Walkthroughs",
    thumbnail: "HI",
    videos: 28,
    author: "Hello Interview",
    gradient: "from-cyan-700 via-teal-800 to-slate-900",
    tag: "HLD Deep Dives",
    description: "End-to-end architectural blueprints from requirements gathering to capacity estimation and database selection.",
    url: "https://www.hellointerview.com"
  },
  {
    id: "engineering-digest",
    title: "Engineering Digest Microservices Architecture",
    thumbnail: "ED",
    videos: 30,
    author: "Engineering Digest",
    gradient: "from-amber-600 via-orange-700 to-slate-900",
    tag: "Microservices",
    description: "Microservices design patterns, distributed tracing, Kafka event pipelines, and Spring Boot cloud services.",
    url: "https://www.youtube.com/@EngineeringDigest"
  },
  {
    id: "code-with-aryan",
    title: "Code With Aryan LLD & Machine Coding",
    thumbnail: "CA",
    videos: 32,
    author: "Code With Aryan",
    gradient: "from-emerald-700 via-teal-800 to-slate-900",
    tag: "LLD & Patterns",
    description: "Hands-on low-level design walkthroughs and machine coding rounds for parking lot, splitwise, and elevator systems.",
    url: "https://www.youtube.com/@CodeWithAryan"
  },
  {
    id: "coder-army-lld",
    title: "Coder Army Object-Oriented Design & LLD",
    thumbnail: "RN",
    videos: 24,
    author: "Coder Army",
    gradient: "from-rose-700 via-red-800 to-slate-900",
    tag: "OOP & LLD",
    description: "Clean code principles, SOLID design fundamentals, and GoF patterns applied to enterprise software systems.",
    url: "https://www.youtube.com/@CoderArmy9"
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
  // Core Subjects
  { id: "dbms", name: "DBMS", questions: 10, description: "Database management systems, SQL, normalization, ACID transactions", color: "#4479A1", group: "Core Subjects" },
  { id: "os", name: "Operating Systems", questions: 10, description: "Processes, threads, memory management, scheduling, virtual memory", color: "#F5A623", group: "Core Subjects" },
  { id: "oops", name: "OOP Concepts", questions: 10, description: "Four pillars, SOLID design principles, polymorphism, design patterns", color: "#A855F7", group: "Core Subjects" },
  { id: "cn", name: "Computer Networks", questions: 10, description: "OSI stack, TCP/IP, HTTP/3, TLS handshakes, DNS resolution", color: "#00BCD4", group: "Core Subjects" },

  // Web
  { id: "javascript", name: "JavaScript", questions: 15, description: "Event loop, closures, prototypes, async/await, ES2024 features", color: "#F7DF1E", group: "Web" },
  { id: "typescript", name: "TypeScript", questions: 15, description: "Type narrowing, conditional types, generics, declaration merging", color: "#3178C6", group: "Web" },
  { id: "react", name: "React.js", questions: 15, description: "Virtual DOM, hooks, state reconciliation, memoization, Server Components", color: "#61DAFB", group: "Web" },
  { id: "node", name: "Node.js", questions: 15, description: "V8 engine, libuv event loop, streams, clustering, microservices", color: "#339933", group: "Web" },
  { id: "python", name: "Python", questions: 15, description: "Pythonic syntax, decorators, generators, GIL, memory management", color: "#3776AB", group: "Web" },

  // Mobile
  { id: "react-native", name: "React Native", questions: 10, description: "Fabric renderer, TurboModules, Reanimated, bridge architecture", color: "#00D8FF", group: "Mobile" },
  { id: "flutter", name: "Flutter", questions: 10, description: "Widget trees, Dart isolates, Riverpod/Bloc state, MethodChannels", color: "#54C5F8", group: "Mobile" },
  { id: "android", name: "Android (Kotlin)", questions: 10, description: "Jetpack Compose, Coroutines, Flow, Hilt, MVVM architecture", color: "#3DDC84", group: "Mobile" },
  { id: "swift", name: "Swift (iOS)", questions: 10, description: "SwiftUI, Swift Concurrency, ARC memory, protocols, GCD", color: "#F05138", group: "Mobile" },

  // DevOps
  { id: "aws", name: "AWS Cloud", questions: 10, description: "EC2, S3, VPC networking, IAM security, Lambda serverless", color: "#FF9900", group: "DevOps" },
  { id: "docker", name: "Docker", questions: 10, description: "Containers vs VMs, multi-stage builds, volumes, compose stacks", color: "#2496ED", group: "DevOps" },
  { id: "kubernetes", name: "Kubernetes", questions: 10, description: "Pod scheduling, Ingress, Services, HPA autoscaling, RBAC", color: "#326CE5", group: "DevOps" },
  { id: "terraform", name: "Terraform", questions: 10, description: "Infrastructure as Code, state locking, modules, drift detection", color: "#844FBA", group: "DevOps" },

  // Databases
  { id: "postgresql", name: "PostgreSQL", questions: 10, description: "MVCC, indexing (B-Tree/GIN), query planning, partitioning", color: "#336791", group: "Databases" },
  { id: "mongodb", name: "MongoDB", questions: 10, description: "Document modeling, aggregation pipelines, ESR indexing, sharding", color: "#47A248", group: "Databases" },
  { id: "redis", name: "Redis", questions: 10, description: "In-memory data structures, caching patterns, pub/sub, clustering", color: "#DC382D", group: "Databases" },
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
  // Tech Stack Specific (7)
  {
    id: "mern-referral",
    title: "MERN Stack Developer – Referral Request",
    description: "High-impact referral email showcasing full-stack JavaScript and production MongoDB experience.",
    category: "Tech Stack Specific",
    content: `Subject: Referral Request: Full-Stack MERN Developer - [Job ID / Requisition]

Hi [Name],

I hope your week is off to a productive start. I am reaching out because I follow your engineering work at [Company] and noticed an opening for a Full-Stack MERN Engineer on your team.

I have spent the past [X years] architecting React frontends with Node/Express backends, handling high-concurrency workloads backed by MongoDB. Here are three quick metrics from my recent work:
• Built a real-time collaborative workspace reducing state synchronization latency by 42%.
• Optimized complex MongoDB aggregation queries, cutting peak P95 query times from 850ms to 120ms.
• Shipped end-to-end REST & WebSocket microservices covered by automated CI/CD pipelines.

I would love to be considered for this role with your referral. My resume and GitHub profile are linked below.

Thank you for your time and guidance,
[Your Name]
Portfolio: [Your URL] | GitHub: [Your Profile] | LinkedIn: [Your Profile]`,
  },
  {
    id: "react-referral",
    title: "React / Frontend Specialist – Role Outreach",
    description: "Tailored for senior/mid frontend roles emphasizing design systems and web performance.",
    category: "Tech Stack Specific",
    content: `Subject: Frontend Engineer Opening ([Job ID]) - Referral Request

Hi [Name],

I hope you're having a great day. I came across the Frontend Engineer opening at [Company] and wanted to connect given your tenure on the engineering team.

As a frontend specialist focused on React 19, TypeScript, and Next.js, I care deeply about performance, type safety, and accessible design systems. At [Current/Previous Role], I:
• Refactored core user checkout flows, lifting conversion by 14% and achieving a 99 Lighthouse performance rating.
• Maintained our multi-package component library used across 8 internal web properties.
• Reduced client-side JavaScript bundle sizes by 35% through tree-shaking and dynamic route streaming.

If you have a quick moment, could you submit my profile for [Job Title / Requisition ID]? My resume is attached for your review.

Warm regards,
[Your Name]
[LinkedIn URL] · [Portfolio URL]`,
  },
  {
    id: "node-referral",
    title: "Node.js Backend Engineer – API & Microservices",
    description: "Emphasizes event-loop efficiency, streaming, microservices, and database tuning.",
    category: "Tech Stack Specific",
    content: `Subject: Backend Engineer (Node.js) - [Company] - Referral Inquiry

Hi [Name],

I saw the Backend Engineer opening at [Company] and immediately noted your team's focus on low-latency microservices.

I specialize in building distributed backend systems in Node.js and TypeScript. A few highlights from my recent projects:
• Designed distributed rate-limiting and job-queue microservices using Redis and BullMQ, handling 15,000+ RPS.
• Migrated legacy monolithic services to modular NestJS microservices with comprehensive integration test suites.
• Profiled memory leaks and CPU bottlenecks using Clinic.js, boosting throughput by 28%.

Would you be open to providing a referral for this role? I have attached my resume and would welcome any feedback.

Best regards,
[Your Name]
[GitHub URL] · [LinkedIn URL]`,
  },
  {
    id: "fullstack-referral",
    title: "Full-Stack Generalist – Product Engineering",
    description: "Designed for fast-moving startups and product teams requiring end-to-end velocity.",
    category: "Tech Stack Specific",
    content: `Subject: Full-Stack Product Engineer ([Job ID]) - Referral Request

Hi [Name],

I have been following [Company]'s product roadmap and noticed the open Full-Stack Software Engineer role. Given your experience at [Company], I wanted to ask if you'd be comfortable referring me.

I operate as a full-cycle product engineer:
• Owned product feature cycles from Figma handoff through schema migrations to production deployment.
• Built full-stack apps in Next.js, TypeScript, PostgreSQL, and Prisma with automated Docker deployments.
• Maintained 99.9% uptime while shipping weekly product iterations and resolving user regressions quickly.

My resume and live projects are attached. I appreciate your time and would be thrilled to contribute to the team!

Best,
[Your Name]
[Portfolio] | [LinkedIn]`,
  },
  {
    id: "vue-referral",
    title: "Vue.js & Nuxt Developer – Frontend Outreach",
    description: "Focuses on Vue 3 Composition API, Nuxt SSR, Pinia state, and modern UI engineering.",
    category: "Tech Stack Specific",
    content: `Subject: Vue / Frontend Developer Opportunity - Referral Request

Hi [Name],

I noticed [Company] utilizes Vue 3 and Nuxt to power your customer-facing applications, and I saw your open Frontend Engineer listing.

I have specialized in the Vue ecosystem for the past [X years]:
• Architected enterprise SPAs and SSR apps with Vue 3, TypeScript, Vite, and Pinia.
• Built reusable UI primitives adhering to WCAG 2.1 AA accessibility guidelines.
• Improved First Contentful Paint (FCP) by 45% via Nuxt route caching and server-side rendering optimizations.

I would be grateful for a referral for this position. Please let me know if you would like any further details about my background.

Sincerely,
[Your Name]
[LinkedIn Profile] · [GitHub]`,
  },
  {
    id: "angular-referral",
    title: "Angular Enterprise Engineer – Large-Scale SPAs",
    description: "Highlights RxJS reactive patterns, NgRx state stores, and modular architecture.",
    category: "Tech Stack Specific",
    content: `Subject: Application for Angular Software Engineer - Referral Request

Hi [Name],

I hope this note finds you well. I came across the Angular Engineer role at [Company] and wanted to reach out to you as a fellow frontend engineer.

I have built complex enterprise web applications with Angular 16+, TypeScript, and RxJS:
• Designed reactive state architectures with NgRx and Signals, cutting unnecessary component re-renders by 50%.
• Authored shared Angular UI components and standalone modules across monorepo codebases using Nx.
• Enforced strict unit and E2E test coverage using Jest and Playwright.

Could you kindly refer me for [Job Requisition ID]? My resume is attached for convenience.

Thank you for your consideration,
[Your Name]
[LinkedIn URL]`,
  },
  {
    id: "django-referral",
    title: "Python / Django Developer – High Scale Systems",
    description: "Emphasizes Django ORM optimization, Celery asynchronous queues, and REST APIs.",
    category: "Tech Stack Specific",
    content: `Subject: Python / Django Developer - Referral Request for [Company]

Hi [Name],

I noticed the Python / Django Engineer position open on your engineering organization at [Company].

With [X years] building scalable backend services with Django, Django REST Framework, and PostgreSQL, I have:
• Eliminated N+1 database queries across heavy reporting endpoints using select_related and prefetch_related.
• Orchestrated background batch processing workflows with Celery and Redis executing 500,000+ daily jobs.
• Deployed production services with Gunicorn, Docker, and Kubernetes.

I would appreciate the chance to be referred for this position. Thank you for your time and help!

Best regards,
[Your Name]
[GitHub] · [LinkedIn]`,
  },

  // Cloud & DevOps (2)
  {
    id: "cloud-architect-referral",
    title: "AWS Cloud Architect – Infrastructure Engineering",
    description: "Focuses on cost optimization, multi-AZ high availability, and secure cloud topologies.",
    category: "Cloud & DevOps",
    content: `Subject: Cloud Infrastructure Engineer - Referral Request - [Company]

Hi [Name],

I hope you're having a productive week. I am reaching out regarding the Cloud Infrastructure / AWS role open at [Company].

As an AWS-certified engineer with hands-on experience designing cloud architectures:
• Architected multi-region AWS infrastructure with Terraform, reducing annual cloud compute spend by 28%.
• Implemented zero-trust VPC peering, IAM role policies, and KMS encryption across production environments.
• Built automated disaster recovery pipelines achieving an RPO < 15 minutes and RTO < 30 minutes.

I would value the opportunity to be referred by you for this role. My resume is attached.

Warm regards,
[Your Name]
[LinkedIn Profile] · [Certifications Link]`,
  },
  {
    id: "devops-sre-referral",
    title: "DevOps & SRE Specialist – Observability & CI/CD",
    description: "Emphasizes Kubernetes orchestration, GitOps, Prometheus metrics, and automated release cycles.",
    category: "Cloud & DevOps",
    content: `Subject: DevOps / SRE Role Referral Request ([Job ID])

Hi [Name],

I noticed [Company] is hiring for a DevOps / Site Reliability Engineer. Having followed your engineering blog on infrastructure reliability, I am excited about your team's mission.

In my recent DevOps roles:
• Scaled production Kubernetes (EKS) clusters serving 40M monthly requests with automated HPA rules.
• Automated blue-green and canary deployments via ArgoCD and GitHub Actions, achieving 99.99% service availability.
• Configured Prometheus, Grafana, and OpenTelemetry tracing dashboards to resolve incidents 60% faster.

Would you be open to forwarding my resume to the hiring team?

Best,
[Your Name]
[GitHub URL] · [LinkedIn URL]`,
  },

  // Data & AI/ML (2)
  {
    id: "data-engineer-referral",
    title: "Data Platform Engineer – ETL Pipelines & Warehousing",
    description: "Focuses on PySpark batch processing, dbt transformation, and Snowflake/BigQuery architectures.",
    category: "Data & AI/ML",
    content: `Subject: Data Engineer Opening - Referral Request ([Requisition ID])

Hi [Name],

I hope all is well with you. I am reaching out to express my strong interest in the Data Engineer position at [Company].

My background is centered on scalable data pipelines and modern data stack tooling:
• Built distributed ETL/ELT pipelines using Apache Spark and Airflow, processing over 2TB of daily transactional logs.
• Modeled dimensional data warehouses in Snowflake and dbt, reducing dashboard query latency by 3.5x.
• Implemented data validation test suites with Great Expectations to maintain data integrity.

I have attached my resume and would be honored if you could refer me for the role.

Thank you very much,
[Your Name]
[LinkedIn URL] · [GitHub Projects]`,
  },
  {
    id: "ml-engineer-referral",
    title: "Machine Learning Engineer – Model Serving & MLOps",
    description: "Highlights PyTorch training, vector embeddings, MLflow tracking, and sub-100ms model inference.",
    category: "Data & AI/ML",
    content: `Subject: Machine Learning Engineer Role - Referral Request

Hi [Name],

I hope you are doing well. I noticed [Company]'s team is hiring an ML Engineer to work on production intelligence and models.

I specialize in building and deploying practical machine learning pipelines:
• Deployed real-time inference services with FastAPI and Triton Inference Server with sub-40ms latency.
• Trained and fine-tuned transformer and embedding models using PyTorch, tracking experiments with MLflow.
• Optimized model weights through quantization (INT8/FP16) and ONNX runtime conversion.

I would love to be considered for this position. If you are open to referring me, my resume is attached.

Best regards,
[Your Name]
[GitHub/HuggingFace] · [LinkedIn]`,
  },

  // Mobile (4)
  {
    id: "react-native-referral",
    title: "React Native Developer – Cross-Platform Apps",
    description: "Emphasizes 60 FPS mobile performance, Reanimated gestures, and native TurboModules.",
    category: "Mobile",
    content: `Subject: React Native Engineer Opening - Referral Request ([Company])

Hi [Name],

I saw the mobile engineering vacancy for a React Native Developer at [Company] and wanted to reach out.

I build performant cross-platform mobile apps for iOS and Android:
• Shipped cross-platform applications to the App Store and Google Play with over 100,000 downloads and a 4.7-star rating.
• Achieved stable 60 FPS gesture and scroll interactions using React Native Reanimated and Gesture Handler.
• Integrated native Swift and Kotlin modules for camera capture and encrypted biometric storage.

Could you help refer me for this opening? My portfolio and resume are attached below.

Warm regards,
[Your Name]
[App Store / Play Store Links] · [LinkedIn]`,
  },
  {
    id: "flutter-referral",
    title: "Flutter & Dart Engineer – Smooth UI & State",
    description: "Focuses on custom painters, Riverpod reactive state, and seamless multi-platform delivery.",
    category: "Mobile",
    content: `Subject: Flutter Developer Role - Referral Request - [Company]

Hi [Name],

I hope you're having a great week. I noticed [Company]'s mobile team is expanding and hiring a Flutter Developer.

I have built production Flutter applications targeting Android, iOS, and Web:
• Implemented declarative state architecture with Riverpod and Freezed, guaranteeing zero unhandled UI states.
• Built responsive custom UI components and animated canvas graphs running at 120Hz refresh rates.
• Configured automated Fastlane CI/CD pipelines to build and deploy daily internal beta releases.

I would appreciate if you could refer me for this role. My resume is attached for your convenience.

Best,
[Your Name]
[GitHub / Demo Apps] · [LinkedIn]`,
  },
  {
    id: "ios-swift-referral",
    title: "iOS Software Engineer – SwiftUI & Swift Concurrency",
    description: "Highlights modern iOS development with SwiftUI, async/await, Combine, and Apple HIG guidelines.",
    category: "Mobile",
    content: `Subject: iOS Engineer Position - Referral Request - [Job ID]

Hi [Name],

I am writing to express my enthusiasm for the iOS Developer position currently open at [Company].

As a native iOS engineer specializing in Swift and modern Apple frameworks:
• Developed and published native iOS applications using SwiftUI, Swift Concurrency (async/await, Actors), and Combine.
• Profiling app launches and memory allocations using Xcode Instruments, eliminating retain cycles and reducing launch times by 30%.
• Integrated StoreKit 2 in-app subscriptions, APNs push notifications, and Core Data persistence.

Would you be open to providing an internal referral for me? My resume is attached.

Thank you for your time and assistance,
[Your Name]
[App Store Portfolio] · [GitHub] · [LinkedIn]`,
  },
  {
    id: "android-kotlin-referral",
    title: "Android Engineer – Jetpack Compose & Kotlin",
    description: "Emphasizes modern Android architecture: Jetpack Compose, Coroutines, Flow, and Hilt.",
    category: "Mobile",
    content: `Subject: Android Engineer Role at [Company] - Referral Request

Hi [Name],

I noticed [Company] is hiring for an Android Engineer to build next-generation mobile experiences.

I have focused exclusively on modern Android development with Kotlin:
• Rebuilt core user flows with Jetpack Compose, cutting code verbosity by 40% while ensuring zero frame-jank recompositions.
• Structured apps using Clean Architecture + MVVM, Kotlin Coroutines, StateFlow, and Hilt dependency injection.
• Authored comprehensive local JUnit tests and UI Espresso/Compose testing suites.

I would be grateful if you could submit my profile as a referral for this role. My resume and GitHub are attached.

Best regards,
[Your Name]
[Play Store Links] · [GitHub] · [LinkedIn]`,
  },
];

// Notes data
export interface Note {
  id: string;
  title: string;
  pages: number;
  category: string;
  description: string;
  tag: string;
  date: string;
  coverGradient: string;
}

export const notes: Note[] = [
  { id: "computer-networks", title: "Computer Networks", pages: 45, category: "Core", tag: "Networking", date: "2026-03-01", coverGradient: "from-cyan-600 to-blue-700", description: "OSI Model, TCP/IP, HTTP/3, DNS hierarchy, TLS handshakes, routing protocols" },
  { id: "operating-systems", title: "Operating Systems", pages: 48, category: "Core", tag: "Kernel & Concurrency", date: "2026-02-24", coverGradient: "from-amber-600 to-orange-700", description: "Processes, threads, memory paging, CPU scheduling, virtual memory, race conditions" },
  { id: "dbms", title: "DBMS & SQL", pages: 50, category: "Core", tag: "Transactions & SQL", date: "2026-02-18", coverGradient: "from-blue-600 to-indigo-700", description: "Normalization (1NF to BCNF), ACID guarantees, write-ahead log, indexing, B-Trees" },
  { id: "system-design", title: "High-Level System Design", pages: 70, category: "Design", tag: "Scalability", date: "2026-03-05", coverGradient: "from-purple-600 to-pink-700", description: "Horizontal scaling, load balancers, CDN caching, CAP theorem, message queues" },
  { id: "low-level-design", title: "Low-Level Design & OOP", pages: 52, category: "Design", tag: "Design Patterns", date: "2026-02-12", coverGradient: "from-emerald-600 to-teal-700", description: "SOLID principles, GoF creational/structural/behavioral patterns, class modeling" },
  { id: "aws", title: "AWS Cloud Architecture", pages: 60, category: "Cloud", tag: "Cloud Architecture", date: "2026-01-30", coverGradient: "from-orange-500 to-amber-700", description: "EC2, S3, VPC subnets, IAM zero-trust, Lambda serverless, DynamoDB scaling" },
  { id: "kubernetes", title: "Kubernetes Orchestration", pages: 42, category: "DevOps", tag: "Containers", date: "2026-02-05", coverGradient: "from-blue-500 to-cyan-700", description: "Pod scheduling, Ingress controllers, Services, HPA autoscaling, Persistent Volumes" },
  { id: "docker", title: "Docker Containerization", pages: 35, category: "DevOps", tag: "Virtualization", date: "2026-01-20", coverGradient: "from-sky-500 to-blue-600", description: "OCI images, multi-stage builds, rootless containers, volumes, compose stacks" },
  { id: "java", title: "Java 21 & Concurrency", pages: 55, category: "Language", tag: "JVM & Concurrency", date: "2026-01-15", coverGradient: "from-red-600 to-rose-700", description: "Virtual threads (Project Loom), memory model, synchronized blocks, garbage collection" },
  { id: "typescript", title: "Advanced TypeScript", pages: 38, category: "Language", tag: "Type System", date: "2026-02-28", coverGradient: "from-blue-600 to-sky-600", description: "Conditional types, template literal types, distributive unions, type narrowing" },
  { id: "redis-in-depth", title: "Redis Architecture & Caching", pages: 32, category: "Core", tag: "In-Memory Data", date: "2026-02-10", coverGradient: "from-red-500 to-amber-600", description: "In-memory structures, RDB/AOF persistence, pub-sub channels, cluster sharding" },
  { id: "git-internals", title: "Git Internals & Workflows", pages: 28, category: "DevOps", tag: "VCS & GitOps", date: "2026-01-10", coverGradient: "from-orange-600 to-red-600", description: "Blobs, trees, commits, rebasing mechanics, conflict resolution, cherry-picking" },
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
  },
  {
    id: "classic-single-column",
    name: "Classic Minimalist (Harvard Style)",
    style: "Academic & Corporate Standard",
    description: "Ultra-clean serif typography trusted across finance, Big Tech, and traditional enterprise screening algorithms.",
    tags: ["ATS-Score: 99/100", "Single-Column", "Minimalist", "High Contrast"],
    overleafUrl: "https://www.overleaf.com/latex/templates",
    githubUrl: "https://github.com",
    markdownCode: `# FIRSTNAME LASTNAME
New York, NY • (555) 234-5678 • firstname.lastname@email.com • linkedin.com/in/firstnamelastname

### EDUCATION
**Columbia University**, The Fu Foundation School of Engineering and Applied Science
*Bachelor of Science in Computer Science*, Minor in Applied Mathematics (May 2024)
- GPA: 3.88/4.00, Dean's List (All Semesters)
- Honors: Tau Beta Pi Engineering Honor Society

### WORK EXPERIENCE
**Stripe** — *Software Engineering Intern* (May 2023 – Aug 2023)
- Implemented real-time fraud scoring pipeline in Ruby and Java evaluating 2,000 transactions/second.
- Reduced false positive flags by 18% through supervised learning model inference optimization.
- Documented internal developer API guidelines adopted across 6 cross-functional engineering pods.

**Bloomberg L.P.** — *Software Developer Intern* (May 2022 – Aug 2022)
- Re-architected financial ticker websocket feed in modern C++ (C++20) yielding a 40% memory footprint drop.
- Collaborated with QA team to achieve 96% unit test line coverage using Google Test and CI pipelines.

### LEADERSHIP & ACTIVITIES
**President**, Association for Computing Machinery (ACM) Student Chapter
- Organized 36-hour annual hackathon with 800+ university attendees and $25,000 corporate sponsorship.
`,
    latexCode: `\\documentclass[10pt,letterpaper]{article}
\\usepackage[margin=0.6in]{geometry}
\\usepackage{enumitem}
\\pagestyle{empty}
\\begin{document}
\\begin{center}
  {\\Large \\textbf{Firstname Lastname}} \\\\[2pt]
  New York, NY \\textbullet\\ (555) 234-5678 \\textbullet\\ candidate@email.com
\\end{center}
\\vspace{-6pt}
\\section*{Education}
\\textbf{Columbia University} \\hfill May 2024\\\\
B.S. in Computer Science (GPA: 3.88/4.00)
\\section*{Experience}
\\textbf{Stripe} -- Software Engineering Intern \\hfill Summer 2023\\\\
\\begin{itemize}[noitemsep,topsep=0pt]
  \\item Implemented real-time transaction scoring in Java/Ruby evaluating 2,000 TPS.
  \\item Reduced false positives by 18\\% via inference optimization.
\\end{itemize}
\\end{document}`
  },
  {
    id: "modern-two-tone",
    name: "Modern Engineering (Senior Track)",
    style: "Two-Tone Structured",
    description: "Polished layout emphasizing leadership scope, business impact metrics, and cloud system architecture.",
    tags: ["ATS-Score: 95/100", "Two-Tone", "Senior SDE", "Cloud Native"],
    overleafUrl: "https://www.overleaf.com/latex/templates",
    githubUrl: "https://github.com",
    markdownCode: `# FIRSTNAME LASTNAME — SENIOR SOFTWARE ENGINEER
Seattle, WA | senior.engineer@domain.com | +1 (555) 987-6543 | github.com/sre-lead

### PROFESSIONAL SUMMARY
Senior Software Engineer with 6+ years specializing in distributed systems, high-availability cloud architecture, and platform engineering. Track record of mentoring junior engineers and leading cross-team technical initiatives.

### KEY TECHNICAL HIGHLIGHTS
- Led cloud migration from on-premise datacenter to AWS EKS, saving $180,000 in annual infrastructure overhead.
- Engineered event-driven pipeline on Apache Kafka and AWS Lambda processing 50M+ daily events with 99.995% SLA.
- Spearheaded company-wide transition to OpenTelemetry distributed tracing, improving Mean Time to Detection (MTTD) by 65%.

### EXPERIENCE
**Lead Platform Engineer** — CloudScale Dynamics (2022 – Present)
- Directed architectural redesign of multi-region payment gateway handling $40M monthly volume.
- Supervised sprint planning and code reviews for a distributed team of 8 software engineers.

**Senior Software Engineer** — Apex Core Systems (2019 – 2022)
- Built gRPC microservices in Go and Rust connecting core identity and billing databases.
`,
    latexCode: `\\documentclass[10pt]{article}
\\usepackage[margin=0.7in]{geometry}
\\usepackage{titlesec}
\\pagestyle{empty}
\\begin{document}
\\textbf{\\LARGE Firstname Lastname} \\hfill senior.engineer@domain.com\\\\
Seattle, WA $|$ github.com/sre-lead $|$ linkedin.com/in/seniorlead
\\rule{\\textwidth}{0.8pt}
\\section*{Experience}
\\textbf{CloudScale Dynamics} -- Lead Platform Engineer \\hfill 2022 -- Present\\\\
Architected multi-region payment platform processing 50M daily events with 99.995\\% SLA.
\\end{document}`
  },
  {
    id: "fresher-intern",
    name: "New Grad & Intern Accelerator",
    style: "Project & Fundamentals First",
    description: "Tailored for early-career developers, interns, and campus placements. Spotlights coursework, hackathons, and high-signal GitHub projects.",
    tags: ["ATS-Score: 98/100", "New Grad", "Internship", "Campus Placements"],
    overleafUrl: "https://www.overleaf.com/latex/templates",
    githubUrl: "https://github.com",
    markdownCode: `# FIRSTNAME LASTNAME
Phone: +91 98765 43210 | Email: fresher.grad@domain.edu | GitHub: github.com/newgrad | LinkedIn: linkedin.com/in/newgrad

### EDUCATION
**Indian Institute of Information Technology**
*B.Tech in Computer Science and Engineering* (2021 – 2025)
- CGPA: 8.9/10.0
- Relevant Coursework: Data Structures, Analysis of Algorithms, DBMS, Operating Systems, Computer Networks

### PROJECTS
**Hirenza Prep Tracker (Prep Platform)** | *Next.js, TypeScript, Tailwind CSS, LocalStorage*
- Engineered an offline-first interview preparation workspace supporting 600+ problems with zero cloud dependency.
- Implemented client-side Leitner spaced repetition interval scheduler and deterministic daily problem generator.
- Achieved perfect 100/100 Lighthouse performance and accessibility scores across all static routes.

**Real-Time Collaborative Code Editor** | *React, Node.js, WebSockets, Redis, Docker*
- Built collaborative web code editor supporting concurrent typing with Operational Transformation (OT).
- Sandboxed remote code execution across Python, JavaScript, and C++ using isolated Docker containers.

### TECHNICAL SKILLS
- **Languages:** C++, Java, Python, JavaScript, TypeScript, SQL
- **Frameworks:** React, Next.js, Node.js, Express, Tailwind CSS
- **Tools:** Git, GitHub, Docker, Postman, Linux Bash, VS Code

### ACHIEVEMENTS & CODING PROFILES
- **LeetCode:** Knight Badge (Rating: 1940+, Top 4% globally, 450+ problems solved).
- **Codeforces:** Specialist (Max rating: 1485).
- Winner, Smart India Hackathon internal round (Rank 1 out of 60 competing teams).
`,
    latexCode: `\\documentclass[10pt]{article}
\\usepackage[margin=0.65in]{geometry}
\\usepackage{hyperref}
\\pagestyle{empty}
\\begin{document}
\\begin{center}
  {\\textbf{\\Large Firstname Lastname}} \\\\[2pt]
  fresher.grad@domain.edu $|$ +91 98765 43210 $|$ \\href{https://github.com/newgrad}{github.com/newgrad}
\\end{center}
\\section*{Education}
\\textbf{B.Tech in Computer Science} -- IIIT \\hfill 2021 -- 2025\\\\
CGPA: 8.9/10.0
\\section*{Key Projects}
\\textbf{Hirenza Prep Tracker} (Next.js, TypeScript, Local-First Engine)\\\\
Built offline-first preparation platform covering 600+ problems with 100 Lighthouse performance.
\\end{document}`
  }
];

// FAQ data
export { faqData, faqCategories, type FAQItem } from './faq';

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
    sampleQuestions?: string[];
  }[];
  topics: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  outcome?: string;
  tips?: string[];
  submittedBy?: string;
  date?: string;
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
