"use client";

import { useTheme } from "next-themes";
import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

export function GiscusEmbed() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-40 animate-pulse bg-surface-2 rounded-xl"></div>;

  const giscusTheme = resolvedTheme === "dark" || theme === "dark" ? "transparent_dark" : "light";

  return (
    <div className="mt-16 pt-8 border-t border-border w-full">
      <h3 className="text-xl font-bold text-primary mb-6">Discussion</h3>
      <Giscus
        id="comments"
        repo="yash23082007/hirenza"
        repoId="R_kgDOMk2F-Q"
        category="General"
        categoryId="DIC_kwDOMk2F-c4Ci2iX"
        mapping="pathname"
        term="Welcome to Hirenza Community!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={giscusTheme}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
