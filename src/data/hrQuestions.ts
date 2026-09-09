export interface HRQuestion {
  id: string;
  question: string;
  category: "Behavioral" | "Situational" | "Strength/Weakness" | "Career Goals" | "Company Fit" | "Problem Solving" | "Teamwork" | "Leadership";
  difficulty: "Easy" | "Medium" | "Hard";
  tips?: string;
}

export const hrQuestionsData: HRQuestion[] = [
  // Behavioral Questions
  { id: "hr1", question: "Tell me about yourself", category: "Behavioral", difficulty: "Easy", tips: "Focus on professional journey, key achievements, and why you're interested in this role" },
  { id: "hr2", question: "What is your greatest strength?", category: "Strength/Weakness", difficulty: "Easy", tips: "Choose a strength relevant to the role and provide a specific example" },
  { id: "hr3", question: "What is your greatest weakness?", category: "Strength/Weakness", difficulty: "Medium", tips: "Be honest but choose a weakness you're actively working to improve" },
  { id: "hr4", question: "Why do you want to work here?", category: "Company Fit", difficulty: "Easy", tips: "Research the company and align your goals with their mission and values" },
  { id: "hr5", question: "Where do you see yourself in 5 years?", category: "Career Goals", difficulty: "Medium", tips: "Show ambition but keep it realistic and aligned with the role" },
  { id: "hr6", question: "Tell me about a time you faced a challenge at work", category: "Behavioral", difficulty: "Medium", tips: "Use STAR method: Situation, Task, Action, Result" },
  { id: "hr7", question: "Describe a situation where you had to work under pressure", category: "Situational", difficulty: "Medium", tips: "Show how you stay calm and deliver results in high-stress situations" },
  { id: "hr8", question: "Tell me about a time you worked in a team", category: "Teamwork", difficulty: "Easy", tips: "Highlight collaboration, communication, and your specific contribution" },
  { id: "hr9", question: "Why should we hire you?", category: "Company Fit", difficulty: "Medium", tips: "Connect your skills and experience to the company's needs" },
  { id: "hr10", question: "What motivates you?", category: "Behavioral", difficulty: "Easy", tips: "Be genuine and connect it to the role and company culture" },

  // Situational Questions
  { id: "hr11", question: "How do you handle tight deadlines?", category: "Situational", difficulty: "Medium", tips: "Show prioritization skills and time management strategies" },
  { id: "hr12", question: "What would you do if you disagreed with your manager?", category: "Situational", difficulty: "Hard", tips: "Show respect, communication skills, and willingness to find common ground" },
  { id: "hr13", question: "How do you prioritize tasks when everything seems urgent?", category: "Situational", difficulty: "Medium", tips: "Explain your prioritization framework and decision-making process" },
  { id: "hr14", question: "What would you do if you made a mistake at work?", category: "Situational", difficulty: "Medium", tips: "Show accountability, problem-solving, and learning from mistakes" },
  { id: "hr15", question: "How do you handle feedback and criticism?", category: "Behavioral", difficulty: "Medium", tips: "Show openness to feedback and ability to improve based on it" },

  // Leadership Questions
  { id: "hr16", question: "Tell me about a time you led a project", category: "Leadership", difficulty: "Hard", tips: "Highlight leadership skills, team management, and project outcomes" },
  { id: "hr17", question: "How do you motivate team members?", category: "Leadership", difficulty: "Hard", tips: "Show empathy, understanding of different personalities, and results" },
  { id: "hr18", question: "Describe a time you had to make a difficult decision", category: "Leadership", difficulty: "Hard", tips: "Show decision-making process, consideration of stakeholders, and outcomes" },
  { id: "hr19", question: "How do you handle conflict in a team?", category: "Teamwork", difficulty: "Medium", tips: "Show conflict resolution skills and focus on solutions" },
  { id: "hr20", question: "Tell me about a time you mentored someone", category: "Leadership", difficulty: "Medium", tips: "Show teaching ability, patience, and the mentee's growth" },

  // Problem Solving
  { id: "hr21", question: "Describe a complex problem you solved", category: "Problem Solving", difficulty: "Hard", tips: "Use STAR method and focus on your thought process" },
  { id: "hr22", question: "How do you approach learning new technologies?", category: "Problem Solving", difficulty: "Easy", tips: "Show curiosity, structured learning approach, and practical application" },
  { id: "hr23", question: "Tell me about a time you had to think creatively", category: "Problem Solving", difficulty: "Medium", tips: "Show innovative thinking and successful outcomes" },
  { id: "hr24", question: "How do you stay updated with industry trends?", category: "Behavioral", difficulty: "Easy", tips: "Mention specific resources and how you apply new knowledge" },
  { id: "hr25", question: "Describe a time you failed and what you learned", category: "Behavioral", difficulty: "Medium", tips: "Show humility, learning mindset, and how you applied those lessons" },

  // Career Goals
  { id: "hr26", question: "What are your salary expectations?", category: "Career Goals", difficulty: "Medium", tips: "Research market rates and provide a reasonable range" },
  { id: "hr27", question: "Why are you leaving your current job?", category: "Career Goals", difficulty: "Medium", tips: "Stay positive and focus on growth opportunities" },
  { id: "hr28", question: "What type of work environment do you prefer?", category: "Company Fit", difficulty: "Easy", tips: "Align with the company's culture and work style" },
  { id: "hr29", question: "Do you prefer working independently or in a team?", category: "Company Fit", difficulty: "Easy", tips: "Show flexibility and ability to work both ways effectively" },
  { id: "hr30", question: "What are your long-term career goals?", category: "Career Goals", difficulty: "Medium", tips: "Show ambition and alignment with the company's growth path" },

  // Additional Questions
  { id: "hr31", question: "How do you handle multiple projects at once?", category: "Situational", difficulty: "Medium", tips: "Show time management, prioritization, and organizational skills" },
  { id: "hr32", question: "Tell me about a time you went above and beyond", category: "Behavioral", difficulty: "Medium", tips: "Show initiative, dedication, and positive impact" },
  { id: "hr33", question: "What would your colleagues say about you?", category: "Behavioral", difficulty: "Medium", tips: "Be honest and provide examples that demonstrate those qualities" },
  { id: "hr34", question: "How do you handle constructive criticism?", category: "Behavioral", difficulty: "Medium", tips: "Show maturity, openness to feedback, and ability to improve" },
  { id: "hr35", question: "What questions do you have for us?", category: "Company Fit", difficulty: "Easy", tips: "Ask about team culture, projects, growth opportunities, or company challenges" },
  { id: "hr36", question: "Describe your ideal workday", category: "Company Fit", difficulty: "Easy", tips: "Align with the company's work style and show enthusiasm" },
  { id: "hr37", question: "How do you measure success?", category: "Behavioral", difficulty: "Medium", tips: "Show results-oriented mindset and continuous improvement" },
  { id: "hr38", question: "Tell me about a time you had to adapt to change", category: "Behavioral", difficulty: "Medium", tips: "Show flexibility, resilience, and positive attitude" },
  { id: "hr39", question: "What makes you unique?", category: "Behavioral", difficulty: "Medium", tips: "Highlight unique skills or experiences relevant to the role" },
  { id: "hr40", question: "Why this role specifically?", category: "Company Fit", difficulty: "Easy", tips: "Connect your skills and interests to the specific role requirements" },
];
