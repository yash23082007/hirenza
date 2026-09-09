import { sqlQuestions } from "@/data";
import { QuestionList } from "@/components/questions/QuestionList";

export default function SQLSheetPage() {
  // Convert SQL questions to QuestionList format
  const questions = sqlQuestions.map(q => ({
    id: q.id,
    title: q.title,
    difficulty: q.difficulty,
    completed: false,
    bookmarked: false,
    topic: q.category,
  }));
  const countByDifficulty = (difficulty: "Easy" | "Medium" | "Hard") =>
    questions.filter(question => question.difficulty === difficulty).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Top 110 Most Asked SQL Interview Queries</h1>
        <p className="text-secondary">Comprehensive collection of SQL interview questions from DataLemur, LeetCode SQL, and HackerRank. Covers SELECT, JOINs, subqueries, aggregations, window functions, and advanced queries.</p>
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
