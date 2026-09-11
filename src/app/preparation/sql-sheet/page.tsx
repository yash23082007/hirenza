import { sqlQuestions } from "@/data";
import { TOTAL_SQL_QUESTIONS } from "@/data/stats";
import { QuestionList } from "@/components/questions/QuestionList";
import { GiscusEmbed } from "@/components/community/GiscusEmbed";

export const metadata = {
  title: `Top ${TOTAL_SQL_QUESTIONS} SQL Interview Queries for SDE & Analyst Roles (2026)`,
  description: "Comprehensive collection of SQL interview questions from DataLemur, LeetCode, and HackerRank covering JOINs, window functions, and aggregations.",
};

export default function SQLSheetPage() {
  // Convert SQL questions to QuestionList format preserving verified practice URLs
  const questions = sqlQuestions.map(q => {
    const urls: { label: string; href: string }[] = [];
    if (q.leetcodeUrl) urls.push({ label: "LeetCode", href: q.leetcodeUrl });
    if (q.hackerrankUrl) urls.push({ label: "HackerRank", href: q.hackerrankUrl });
    if (q.datalemurUrl) urls.push({ label: "DataLemur", href: q.datalemurUrl });

    return {
      id: q.id,
      title: q.title,
      difficulty: q.difficulty,
      completed: false,
      bookmarked: false,
      topic: `${q.category} • ${q.topic}`,
      urls,
      approach: `Master ${q.category} query structure. Pay attention to filter placement (WHERE vs HAVING), NULL handling, and windowing frames.`,
    };
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
          Top {TOTAL_SQL_QUESTIONS} Most Asked SQL Interview Queries
        </h1>
        <p className="text-secondary">
          Comprehensive collection of SQL interview questions with verified practice links to DataLemur, LeetCode SQL, and HackerRank.
        </p>
      </div>

      <QuestionList questions={questions} storageKey="sql" />
      <GiscusEmbed />
    </div>
  );
}
