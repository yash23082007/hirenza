import { NextResponse } from "next/server";

export async function GET() {
  try {
    const query = `
      query {
        topTwoContests {
          title
          titleSlug
          startTime
          duration
        }
      }
    `;

    const lcResponse = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!lcResponse.ok) {
      throw new Error("Failed to fetch LeetCode");
    }

    interface LeetCodeRawContest {
      title: string;
      titleSlug: string;
      startTime: number;
      duration: number;
    }

    const lcData = await lcResponse.json();
    const lcContests = lcData?.data?.topTwoContests?.map((c: LeetCodeRawContest) => ({
      id: `lc-${c.titleSlug}`,
      platform: "LeetCode",
      title: c.title,
      startTime: new Date(c.startTime * 1000).toISOString(),
      durationMinutes: c.duration / 60,
      url: `https://leetcode.com/contest/${c.titleSlug}`,
    })) || [];

    return NextResponse.json({ success: true, leetcode: lcContests });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
