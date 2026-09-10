import { roleWiseData } from "./roleSkills";

const TOTAL_ROLES = roleWiseData.length;

export interface FAQItem {
  q: string;
  a: string;
  category: string;
}

export const faqCategories = [
  "All",
  "Features & Functionality",
  "Content & Resources",
  "Account",
  "Career Preparation",
  "Community",
  "Security",
] as const;

export const faqData: FAQItem[] = [
  { 
    q: "What does Hirenza offer?", 
    a: "Hirenza is an offline-first interview cockpit bringing together curated DSA sheets, high-frequency company archives, algorithmic patterns, system design blueprints, SQL practice, and career assets into one unified platform without subscriptions.", 
    category: "Features & Functionality" 
  },
  { 
    q: "Is Hirenza free?", 
    a: "Yes. Hirenza is completely free and open source under the MIT License. Every sheet, problem archive, and tool is accessible to all developers.", 
    category: "Account" 
  },
  { 
    q: "Can I track my interview preparation?", 
    a: "Yes. The cockpit includes 4-state problem tracking (unsolved, in review, solved, mastered), GitHub-style heatmaps, streak calendars, Leitner spaced repetition, and target company readiness scores.", 
    category: "Features & Functionality" 
  },
  { 
    q: "Can I save and bookmark questions?", 
    a: "Yes. You can star and bookmark any question across all sheets, patterns, and company archives. Bookmarked questions synchronize with your profile and the global ⌘K palette.", 
    category: "Features & Functionality" 
  },
  { 
    q: "Can I access notes directly?", 
    a: "Yes. All engineering reference notes are available directly within the platform. Browse concise summaries on Operating Systems, DBMS internals, and Distributed Systems instantly.", 
    category: "Content & Resources" 
  },
  { 
    q: "How do I use the DSA sheets?", 
    a: "Navigate to the DSA Sheets section, select a curated sheet (such as Striver A2Z, NeetCode 150, or Love Babbar), and solve problems systematically. Status changes immediately update your revision queue.", 
    category: "Content & Resources" 
  },
  { 
    q: "Does Hirenza support different roles?", 
    a: `Yes. We offer role-wise preparation across ${TOTAL_ROLES} engineering tracks, covering technical competencies, core interview topics, and responsibilities for each specialization.`, 
    category: "Career Preparation" 
  },
  { 
    q: "Can I switch between dark and light mode?", 
    a: "Yes. Use the theme toggle in the navigation bar to switch between dark and light themes. Your preference persists automatically across sessions.", 
    category: "Features & Functionality" 
  },
  { 
    q: "Do you provide resume templates?", 
    a: "Yes. We offer ATS-optimized resume templates in Markdown and LaTeX formats designed specifically for engineering roles, with sample metrics and Overleaf links.", 
    category: "Career Preparation" 
  },
  { 
    q: "How can I contribute to Hirenza?", 
    a: "Hirenza is open source. You can submit pull requests, add interview experiences, suggest curated problems, or report issues directly on GitHub.", 
    category: "Community" 
  },
  { 
    q: "Can I use Hirenza without an account?", 
    a: "Yes. Hirenza requires zero account creation or authentication. Your preparation data stays private in your browser with one-click JSON export and import.", 
    category: "Account" 
  },
  { 
    q: "Where can I discuss a resource or share an experience?", 
    a: "You can open a discussion or issue in our public GitHub repository, or connect with fellow developers via our community channels.", 
    category: "Community" 
  },
  { 
    q: "Does Hirenza send my progress to a server?", 
    a: "No. All statuses, bookmarks, timestamps, and target profiles remain stored strictly in your browser's localStorage. The app makes zero telemetry or external user data requests.", 
    category: "Security" 
  },
  { 
    q: "Can I inspect how Hirenza handles my data?", 
    a: "Yes. The codebase is completely open source. You can inspect our storage services, validation schemas, and import/export implementations directly in the repository.", 
    category: "Security" 
  },
];
