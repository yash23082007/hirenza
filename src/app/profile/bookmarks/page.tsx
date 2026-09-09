import { Bookmark } from "lucide-react";

export default function BookmarksPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Saved Bookmarks</h1>
        <p className="text-secondary">Questions, resources, and notes you&apos;ve saved for later.</p>
      </div>

      <div className="grid gap-4">
        {[
          { title: "Two Sum", type: "Problem", category: "Arrays", difficulty: "Easy" },
          { title: "LRU Cache", type: "Problem", category: "Design", difficulty: "Medium" },
          { title: "System Design: URL Shortener", type: "Resource", category: "System Design" },
          { title: "CAP Theorem Notes", type: "Note", category: "Core Subjects" },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-surface-2 border border-border rounded-xl hover:border-border-hover transition-colors group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-surface-3 flex items-center justify-center text-muted group-hover:text-primary transition-colors">
                <Bookmark size={18} />
              </div>
              <div>
                <h3 className="font-medium group-hover:text-purple-400 transition-colors">{item.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded-md bg-surface-3 text-secondary">{item.type}</span>
                  <span className="text-xs text-muted">{item.category}</span>
                </div>
              </div>
            </div>
            {item.difficulty && (
              <span className={`text-xs px-2 py-1 rounded-md ${
                item.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
                item.difficulty === 'Medium' ? 'bg-orange-500/10 text-orange-500' :
                'bg-red-500/10 text-red-500'
              }`}>
                {item.difficulty}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
