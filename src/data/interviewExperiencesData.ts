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
  outcome: string;
  tips: string[];
  submittedBy: string;
  date: string;
}

export const interviewExperiencesData: InterviewExperience[] = [
  {
    id: "google-sde1-1",
    company: "Google",
    role: "SDE 1",
    level: "SDE 1",
    rounds: [
      {
        name: "Online Assessment",
        description: "2 coding problems (1 Medium, 1 Hard) in 90 minutes. Proctored with webcam.",
        duration: "90 min",
        sampleQuestions: ["Find the shortest path in a weighted graph", "Optimal string partitioning problem"],
      },
      {
        name: "Technical Round 1",
        description: "2 DSA problems focusing on arrays and graphs. Interviewer gave hints after initial approach.",
        duration: "45 min",
        sampleQuestions: ["Given a grid, find all connected components", "Design a data structure for LRU Cache"],
      },
      {
        name: "Technical Round 2",
        description: "Trees and DP problems. Had to write clean, testable code on Google Doc.",
        duration: "45 min",
        sampleQuestions: ["Binary tree maximum path sum", "Minimum cost to reach target with constraints"],
      },
      {
        name: "Technical Round 3",
        description: "System design for distributed systems + behavioral questions.",
        duration: "60 min",
        sampleQuestions: ["Design a URL shortener like bit.ly", "How would you handle 1M concurrent users?"],
      },
      {
        name: "Team Match / Hiring Committee",
        description: "Review of all rounds. Matched with a team after 2 weeks.",
        duration: "1-2 weeks",
      },
    ],
    topics: ["Arrays", "Trees", "Graphs", "Dynamic Programming", "System Design", "Behavioral"],
    difficulty: "Hard",
    outcome: "Selected",
    tips: [
      "Think out loud — Google cares about your thought process",
      "Always start with brute force, then optimize",
      "Ask clarifying questions before coding",
      "Practice graph problems extensively",
    ],
    submittedBy: "Anonymous Candidate",
    date: "Aug 2025",
  },
  {
    id: "amazon-sde1-1",
    company: "Amazon",
    role: "SDE 1",
    level: "SDE 1",
    rounds: [
      {
        name: "Online Assessment",
        description: "2 coding problems + work simulation questionnaire + leadership principles assessment.",
        duration: "120 min",
        sampleQuestions: ["Amazon warehouse robot path optimization", "Custom data structure implementation"],
      },
      {
        name: "Technical Round 1",
        description: "2 DSA problems. Emphasis on data structures and problem-solving approach.",
        duration: "45-60 min",
        sampleQuestions: ["Design a rate limiter", "Merge overlapping intervals"],
      },
      {
        name: "Technical Round 2",
        description: "2 DSA problems + Low-Level Design (OOP). Object-oriented design question.",
        duration: "45-60 min",
        sampleQuestions: ["Design a parking lot system", "Find median in a data stream"],
      },
      {
        name: "Loop (Virtual Onsite)",
        description: "3-4 rounds: coding, system design, and heavy behavioral (Leadership Principles).",
        duration: "4-5 hours",
        sampleQuestions: ["Tell me about a time you disagreed with a teammate", "Design an e-commerce order system"],
      },
    ],
    topics: ["Arrays", "Strings", "Trees", "HashMaps", "OOP Design", "Leadership Principles"],
    difficulty: "Medium",
    outcome: "Selected",
    tips: [
      "Prepare 15-20 Leadership Principle stories using STAR format",
      "Amazon weighs behavioral equally with technical",
      "Practice OOP design questions (parking lot, elevator, etc.)",
      "Focus on edge cases and input validation",
    ],
    submittedBy: "Verified Candidate",
    date: "Jul 2025",
  },
  {
    id: "microsoft-sde1-1",
    company: "Microsoft",
    role: "SDE 1",
    level: "SDE 1",
    rounds: [
      {
        name: "Online Assessment",
        description: "2 coding problems on HackerRank, 30 min each. No negative marking.",
        duration: "60 min",
        sampleQuestions: ["String manipulation with constraints", "Binary tree traversal variant"],
      },
      {
        name: "Technical Round 1",
        description: "2-3 DSA problems with focus on clean code and edge cases.",
        duration: "45 min",
        sampleQuestions: ["Implement a custom hash map", "Find all anagrams in a string"],
      },
      {
        name: "Technical Round 2",
        description: "System design (HLD/LLD), architecture discussion. Drew diagrams on whiteboard tool.",
        duration: "45 min",
        sampleQuestions: ["Design a chat application", "Design a notification system"],
      },
      {
        name: "Technical Round 3",
        description: "Advanced DSA + problem-solving approach discussion. Open-ended problems.",
        duration: "45 min",
        sampleQuestions: ["Implement a task scheduler", "Graph coloring problem"],
      },
      {
        name: "As/Appropriateness Round",
        description: "Culture fit, team collaboration, and behavioral questions.",
        duration: "30 min",
        sampleQuestions: ["Tell me about a difficult debugging experience", "How do you handle feedback?"],
      },
    ],
    topics: ["Arrays", "Strings", "Trees", "System Design", "Clean Code", "Behavioral"],
    difficulty: "Medium",
    outcome: "Selected",
    tips: [
      "Microsoft values clean, readable code over clever solutions",
      "Practice drawing system design diagrams",
      "Prepare for open-ended problem statements",
      "Show collaborative mindset in behavioral round",
    ],
    submittedBy: "Anonymous Candidate",
    date: "Sep 2025",
  },
  {
    id: "meta-sde1-1",
    company: "Meta",
    role: "SDE 1",
    level: "SDE 1",
    rounds: [
      {
        name: "Online Assessment",
        description: "2 coding problems, 30 min each. Strict time limit.",
        duration: "60 min",
        sampleQuestions: ["Array manipulation with sliding window", "Graph BFS shortest path"],
      },
      {
        name: "Technical Round 1",
        description: "2 medium-hard coding problems in 45 min. Speed is critical at Meta.",
        duration: "45 min",
        sampleQuestions: ["Product of array except self", "Serialize and deserialize a binary tree"],
      },
      {
        name: "Technical Round 2",
        description: "2 medium-hard coding problems. Focus on optimal solution with clean code.",
        duration: "45 min",
        sampleQuestions: ["Word search in 2D grid", "Design an in-memory file system"],
      },
      {
        name: "Behavioral Round",
        description: "Meta values, past projects, and collaboration examples.",
        duration: "30 min",
        sampleQuestions: ["Tell me about a time you moved fast", "Describe a project you're proud of"],
      },
    ],
    topics: ["Arrays", "Strings", "Graphs", "Dynamic Programming", "Speed & Accuracy"],
    difficulty: "Hard",
    outcome: "Selected",
    tips: [
      "Speed matters at Meta — practice solving Medium in 15-20 min",
      "You must write bug-free code on first attempt",
      "Meta focuses on 'getting things done' — show bias for action",
      "Practice LeetCode Medium-Hard without IDE or debugger",
    ],
    submittedBy: "Verified Candidate",
    date: "Oct 2025",
  },
  {
    id: "flipkart-sde1-1",
    company: "Flipkart",
    role: "SDE 1",
    level: "SDE 1",
    rounds: [
      {
        name: "Online Assessment",
        description: "2 coding problems + 2 MCQ sections (CS fundamentals + aptitude).",
        duration: "105 min",
        sampleQuestions: ["Maximum subarray sum with modifications", "Network flow optimization"],
      },
      {
        name: "Coding Round 1",
        description: "2 DSA problems. Flipkart-style tree and graph problems.",
        duration: "75 min",
        sampleQuestions: ["Diameter of binary tree", "Shortest path in a maze with obstacles"],
      },
      {
        name: "Coding Round 2",
        description: "2 harder DSA problems + machine coding (build a mini-application).",
        duration: "90 min",
        sampleQuestions: ["Implement a LRU cache with thread safety", "Design a simple search engine"],
      },
      {
        name: "System Design + HR",
        description: "HLD discussion + behavioral questions.",
        duration: "60 min",
        sampleQuestions: ["Design Flipkart's product catalog", "Tell me about a time you handled a production bug"],
      },
    ],
    topics: ["Trees", "Graphs", "Machine Coding", "System Design", "Aptitude"],
    difficulty: "Hard",
    outcome: "Selected",
    tips: [
      "Flipkart loves tree and graph problems — practice these thoroughly",
      "Machine coding round: build a working application in 90 min",
      "Don't ignore aptitude section in online round",
      "Prepare for concurrency-related questions",
    ],
    submittedBy: "Anonymous Candidate",
    date: "Nov 2025",
  },
  {
    id: "adobe-sde1-1",
    company: "Adobe",
    role: "SDE 1",
    level: "SDE 1",
    rounds: [
      {
        name: "Online Assessment",
        description: "3 coding problems + MCQs on CS fundamentals.",
        duration: "120 min",
        sampleQuestions: ["String compression", "Matrix rotation", "Binary tree to DLL conversion"],
      },
      {
        name: "Technical Round 1",
        description: "2 DSA problems with focus on arrays and strings.",
        duration: "45 min",
        sampleQuestions: ["Longest palindromic substring", "Rotate matrix by 90 degrees in-place"],
      },
      {
        name: "Technical Round 2",
        description: "Advanced DSA + system design discussion.",
        duration: "45 min",
        sampleQuestions: ["Design a photo editing application", "Implement a spell checker"],
      },
      {
        name: "HR Round",
        description: "Behavioral questions, salary expectations, and availability.",
        duration: "30 min",
        sampleQuestions: ["Why Adobe?", "Where do you see yourself in 5 years?"],
      },
    ],
    topics: ["Arrays", "Strings", "Matrix", "System Design", "Behavioral"],
    difficulty: "Medium",
    outcome: "Selected",
    tips: [
      "Adobe loves string and matrix manipulation problems",
      "Prepare OOP design questions for technical rounds",
      "Research Adobe products before interview",
      "Show passion for creativity and design",
    ],
    submittedBy: "Verified Candidate",
    date: "Jun 2025",
  },
  {
    id: "startup-sde1-1",
    company: "Series B Startup (Fintech)",
    role: "SDE 1",
    level: "SDE 1",
    rounds: [
      {
        name: "Take-home Assignment",
        description: "Build a REST API for a payment system with tests. 48-hour deadline.",
        duration: "48 hrs",
        sampleQuestions: ["Build endpoints for create payment, get status, refund, and webhook notifications"],
      },
      {
        name: "Technical Discussion",
        description: "Review of take-home + DSA problems. Discussed architecture decisions.",
        duration: "60 min",
        sampleQuestions: ["How would you handle race conditions in payments?", "Design a notification system"],
      },
      {
        name: "Pair Programming",
        description: "Live coding session building a feature together with the interviewer.",
        duration: "60 min",
        sampleQuestions: ["Implement a rate limiter middleware", "Build a simple caching layer"],
      },
      {
        name: "Culture Fit",
        description: "Discussion with engineering manager and team lead about values, working style.",
        duration: "45 min",
        sampleQuestions: ["Tell me about a time you disagreed with a design decision", "How do you prioritize work?"],
      },
    ],
    topics: ["System Design", "DSA", "API Design", "Testing", "Pair Programming"],
    difficulty: "Medium",
    outcome: "Selected",
    tips: [
      "Startup interviews test practical skills, not just DSA",
      "Take-home assignment: write production-quality code with tests",
      "Show you can work collaboratively in pair programming",
      "Research the startup's product and market",
    ],
    submittedBy: "Anonymous Candidate",
    date: "May 2025",
  },
  {
    id: "apple-sde1-1",
    company: "Apple",
    role: "SDE 1",
    level: "SDE 1",
    rounds: [
      {
        name: "Recruiter Screen",
        description: "30-min call to discuss background, interests, and team fit.",
        duration: "30 min",
      },
      {
        name: "Technical Phone Screen",
        description: "1 DSA problem + discussion about past projects.",
        duration: "45 min",
        sampleQuestions: ["Implement a concurrent LRU cache", "Discuss your most challenging project"],
      },
      {
        name: "Onsite Loop 1",
        description: "2 coding problems focused on data structures.",
        duration: "60 min",
        sampleQuestions: ["Design a task scheduler with priorities", "Implement a trie with autocomplete"],
      },
      {
        name: "Onsite Loop 2",
        description: "System design + architecture discussion.",
        duration: "60 min",
        sampleQuestions: ["Design iCloud sync service", "Design an app notification system for 1B devices"],
      },
      {
        name: "Onsite Loop 3",
        description: "Deep dive into a past project + behavioral questions.",
        duration: "60 min",
        sampleQuestions: ["Walk through your architecture decision for X project", "Tell me about a time you failed"],
      },
    ],
    topics: ["DSA", "System Design", "Concurrency", "Architecture", "Behavioral"],
    difficulty: "Hard",
    outcome: "Selected",
    tips: [
      "Apple values deep technical knowledge over breadth",
      "Prepare to discuss projects in extreme detail",
      "Concurrency and threading questions are common",
      "Show passion for Apple products and user experience",
    ],
    submittedBy: "Verified Candidate",
    date: "Apr 2025",
  },
];
