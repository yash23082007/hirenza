export interface InterviewExperience {
  id: string;
  company: string;
  role: string;
  level: string;
  rounds: number;
  difficulty: "Easy" | "Medium" | "Hard";
  topics: string[];
  duration: string;
  description: string;
}

export const interviewExperiences: InterviewExperience[] = [
  {
    id: "1",
    company: "Google",
    role: "SDE",
    level: "L3",
    rounds: 4,
    difficulty: "Hard",
    topics: ["DSA", "System Design", "Behavioral"],
    duration: "2-3 weeks",
    description: "Typical Google interview process includes phone screen, 2 technical rounds, and 1 behavioral round. Heavy focus on problem-solving approach and code quality."
  },
  {
    id: "2",
    company: "Amazon",
    role: "SDE",
    level: "SDE-1",
    rounds: 5,
    difficulty: "Hard",
    topics: ["DSA", "System Design", "Leadership Principles", "Behavioral"],
    duration: "3-4 weeks",
    description: "Amazon's interview process is rigorous with strong emphasis on Leadership Principles. Expect 1-2 coding rounds, 1 system design, and multiple behavioral questions."
  },
  {
    id: "3",
    company: "Microsoft",
    role: "SDE",
    level: "59",
    rounds: 4,
    difficulty: "Medium",
    topics: ["DSA", "System Design", "Behavioral"],
    duration: "2-3 weeks",
    description: "Microsoft focuses on clean code, problem-solving approach, and collaboration. Interviews are typically 45-60 minutes with emphasis on communication."
  },
  {
    id: "4",
    company: "Meta",
    role: "SWE",
    level: "E3",
    rounds: 4,
    difficulty: "Hard",
    topics: ["DSA", "System Design", "Behavioral"],
    duration: "2 weeks",
    description: "Meta (Facebook) has a fast-paced interview process with heavy focus on coding speed and accuracy. System design is critical for senior roles."
  },
  {
    id: "5",
    company: "Apple",
    role: "Software Engineer",
    level: "ICT2",
    rounds: 5,
    difficulty: "Hard",
    topics: ["DSA", "System Design", "Behavioral", "Domain Knowledge"],
    duration: "3-4 weeks",
    description: "Apple interviews are known for deep domain-specific questions and emphasis on problem-solving methodology. Expect detailed technical discussions."
  },
  {
    id: "6",
    company: "Netflix",
    role: "Software Engineer",
    level: "ICT2",
    rounds: 4,
    difficulty: "Hard",
    topics: ["System Design", "Coding", "Behavioral"],
    duration: "2-3 weeks",
    description: "Netflix has a unique interview process focused heavily on system design and real-world problem solving. Less emphasis on competitive programming style questions."
  }
];
