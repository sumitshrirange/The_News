import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSummary } from "../config/api";
import Loader from "../components/Loader";
import { formatDate } from "../utils/formatDate";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";

export default function NewsDetail() {
  const { state } = useLocation();
  const { url, title, thumbnail, name, date } = state || {};

  const [news, setNews] = useState({ summary: "" });
  const [loading, setLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!url) return;

    const loadSummary = async () => {
      try {
        const data = await fetchSummary(url);
        setNews({
          summary: data.summary,
        });
      } catch (err) {
        console.error("Failed to fetch summary:", err);
        setNews({
          summary: "Unable to load summary.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadSummary();
  }, [url]);

  const handleSpeak = () => {
    if (!("speechSynthesis" in window)) {
      alert("Sorry, your browser does not support Text-to-Speech!");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel(); // stop current speech
      setIsSpeaking(false);
      return;
    }

    const speech = new SpeechSynthesisUtterance(news.summary);
    speech.lang = "en-US"; // language
    speech.rate = 1; // speed (0.5 - 2)
    speech.pitch = 1; // pitch (0 - 2)

    speech.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(speech);
    setIsSpeaking(true);
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      {thumbnail && (
        <img
          src={thumbnail}
          alt={title || "News thumbnail"}
          className="w-full rounded-md mb-4"
          loading="lazy"
        />
      )}

      <p className="text-xs md:text-sm text-gray-400">
        {name && `${name} — `} {formatDate(date)}
      </p>

      <button
        onClick={handleSpeak}
        className={`my-2 md:my-3 md:text-[16px] text-sm font-semibold cursor-pointer ${
          isSpeaking ? "text-red-400" : "text-blue-400"
        }`}
      >
        {isSpeaking ? (
          <div className="flex items-center gap-1">
            Stop <HiMiniSpeakerXMark className="text-lg" />
          </div>
        ) : (
          <div className="flex items-center gap-1">
            Listen <HiMiniSpeakerWave className="text-lg" />
          </div>
        )}
      </button>

      <p className="text-sm md:text-lg leading-relaxed">{news.summary}</p>

      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm md:text-[16px] mt-6 text-blue-600 hover:underline"
        >
          Read Original Article →
        </a>
      )}
    </div>
  );
}
