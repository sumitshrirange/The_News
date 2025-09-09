// Fetching News from Backend
export const fetchNewsByTopic = async (topicToken) => {
  try {
    const res = await fetch(`https://the-news-backend.vercel.app/api/news/${topicToken}`);
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
};

// Fetching Summary from Backend
export const fetchSummary = async (url) => {
  try {
    const res = await fetch("https://the-news-backend.vercel.app/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
    return {
      title: data?.title || "Untitled",
      summary: data?.summary || "No summary available.",
    };
  } catch {
    return {
      title: "Error",
      summary: "Failed to fetch summary. Please try again later.",
    };
  }
};
