import { ActivityChart, StreakCalendar } from "@/components/dashboard/ActivityChart";

export default function ProgressPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Progress</h1>
        <p className="text-secondary">Track your interview preparation consistency.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        <div>
          <StreakCalendar />
        </div>
      </div>

      <div className="mt-8 bg-surface-2 border border-border rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-6">Topic Mastery</h3>
        <div className="space-y-6">
          {[
            { topic: "Arrays & Hashing", progress: 85, color: "bg-green-500" },
            { topic: "Two Pointers", progress: 60, color: "bg-blue-500" },
            { topic: "Dynamic Programming", progress: 30, color: "bg-purple-500" },
            { topic: "System Design", progress: 45, color: "bg-orange-500" },
          ].map(t => (
            <div key={t.topic}>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">{t.topic}</span>
                <span className="text-muted">{t.progress}%</span>
              </div>
              <div className="w-full bg-surface-3 rounded-full h-2">
                <div className={`h-2 rounded-full ${t.color}`} style={{ width: `${t.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
