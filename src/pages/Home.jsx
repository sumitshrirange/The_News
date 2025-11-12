import React, { useState, useEffect } from "react";
import { PiArrowCircleRight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { fetchNewsByTopic } from "../config/api.js";
import { TOPIC_TOKENS } from "../config/topics.js";
import { formatDate } from "../utils/formatDate";
import Loader from "../components/Loader.jsx";

import WorldNewsImg from "../assets/worldnews.png";
import TechnologyImg from "../assets/technology.png";
import HealthImg from "../assets/health.png";
import SportsImg from "../assets/sports.png";

// ---------------- Reusable News Section ------------------------

function NewsSection({ title, topic, viewAllLink, maxItems = 4, layout = "grid" }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNewsByTopic(topic);
        setNews(data.slice(0, maxItems).map((item) => item.highlight || item));
      } catch (err) {
        console.error(`Failed to load ${title}`, err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, [topic, title, maxItems]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-sm mt-4">Failed to load {title}</p>;

  // Reusable Card
  const renderCard = (article, idx, isGrid = true) => (
    <Link
      key={idx}
      to={`/news/${idx}`}
      state={{
        url: article.link || article.highlight?.link,
        title: article.title || article.highlight.title,
        thumbnail: article.thumbnail || article.highlight?.thumbnail,
        name: article.source?.name || article.highlight?.source?.name,
        date: article.date || article.highlight?.date,
      }}
      className={`group rounded-md overflow-hidden ${isGrid ? "" : "flex gap-3 items-center"}`}
    >
      {isGrid ? (
        <>
          <div className="relative h-60 w-full overflow-hidden">
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <small className="text-white flex items-center gap-1">Read Article →</small>
            </div>
          </div>
          <p className="mt-2 font-medium">{article.title}</p>
          <p className="text-xs text-gray-500">
            {article.source?.name || article.name} — {formatDate(article.date)}
          </p>
        </>
      ) : (
        <>
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-28 h-20 object-cover rounded-md"
            loading="lazy"
          />
          <div>
            <p className="font-medium">{article.title}</p>
            <p className="text-xs text-gray-500">
              {article.source?.name || article.name} — {formatDate(article.date)}
            </p>
          </div>
        </>
      )}
    </Link>
  );

  return (
    <div className="mt-10 mb-7">
      <div className="flex items-center justify-between border-b-2 py-2 border-gray-300">
        <h1 className="md:text-2xl text-xl uppercase">{title}</h1>
        {viewAllLink && (
          <Link to={viewAllLink} className="flex items-center gap-1 text-sm">
            View All <PiArrowCircleRight className="size-4" />
          </Link>
        )}
      </div>

      {layout === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {news.map((article, idx) => renderCard(article, idx, true))}
        </div>
      ) : (
        <div className="flex flex-col gap-3 mt-4">
          {news.map((article, idx) => renderCard(article, idx, false))}
        </div>
      )}
    </div>
  );
}

// ---------------- Top home cards ------------------------

const TopHomeCards = React.memo(() => {
  const cards = [
    {
      title: "WORLD NEWS",
      desc: "Economic policies are...",
      link: "/worldnews",
      img: WorldNewsImg,
    },
    {
      title: "TECHNOLOGY",
      desc: "The latest trends in AI and in...",
      link: "/technology",
      img: TechnologyImg,
    },
    {
      title: "HEALTH",
      desc: "Analyzing the effects of glo...",
      link: "/health",
      img: HealthImg,
    },
    {
      title: "SPORTS",
      desc: "Affect the integrity and fu...",
      link: "/sports",
      img: SportsImg,
    },
  ];

  return (
    <div className="mt-9 mb-9 flex flex-wrap items-center justify-between gap-4">
      {cards.map((card, idx) => (
        <Link key={idx} to={card.link} className="flex items-center gap-2 w-40 md:w-60">
          <img className="size-15 rounded-md" src={card.img} alt={card.title} loading="lazy" />
          <div className="leading-4">
            <p className="text-xs">{card.title}</p>
            <small className="text-[11px] opacity-50">{card.desc}</small>
          </div>
        </Link>
      ))}
    </div>
  );
});

// ---------------- Home Page ------------------------

function Home() {
  return (
    <>
      <TopHomeCards />
      <NewsSection title="World News" topic={TOPIC_TOKENS.world} viewAllLink="/worldnews" maxItems={3} />
      <NewsSection title="Technology News" topic={TOPIC_TOKENS.technology} viewAllLink="/technology" maxItems={3} layout="grid" />
      <NewsSection title="Business News" topic={TOPIC_TOKENS.business} viewAllLink="/business" maxItems={6} layout="grid" />
    </>
  );
}

export default Home;
