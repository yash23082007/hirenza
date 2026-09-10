"use client";

export interface TabItem<T extends string = string> {
  id: T;
  label: string;
  count?: number;
}

interface FilterTabsProps<T extends string = string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (id: T) => void;
  className?: string;
}

export function FilterTabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  className = "",
}: FilterTabsProps<T>) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer inline-flex items-center gap-1.5 ${
              isActive
                ? "bg-purple-1 text-white shadow-sm ring-1 ring-purple-1"
                : "bg-surface-2 text-secondary border border-border hover:border-purple-1/30 hover:text-primary"
            }`}
          >
            <span>{tab.label}</span>
            {typeof tab.count === "number" && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-surface-3 text-muted"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
