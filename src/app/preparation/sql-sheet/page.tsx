import { sqlQuestions } from "@/data";
import { QuestionList } from "@/components/questions/QuestionList";

export const metadata = {
  title: "Top 110 SQL Interview Queries",
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

  const countByDifficulty = (difficulty: "Easy" | "Medium" | "Hard") =>
    questions.filter(question => question.difficulty === difficulty).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
          Top 110 Most Asked SQL Interview Queries
        </h1>
        <p className="text-secondary">
          Comprehensive collection of SQL interview questions with verified practice links to DataLemur, LeetCode SQL, and HackerRank.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="border border-border rounded-xl bg-surface-2 p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{countByDifficulty("Easy")}</div>
          <div className="text-xs text-muted">Easy</div>
        </div>
        <div className="border border-border rounded-xl bg-surface-2 p-4 text-center">
          <div className="text-2xl font-bold text-orange-400">{countByDifficulty("Medium")}</div>
          <div className="text-xs text-muted">Medium</div>
        </div>
        <div className="border border-border rounded-xl bg-surface-2 p-4 text-center">
          <div className="text-2xl font-bold text-red-400">{countByDifficulty("Hard")}</div>
          <div className="text-xs text-muted">Hard</div>
        </div>
      </div>

      <QuestionList questions={questions} storageKey="sql" />
    </div>
  );
}
