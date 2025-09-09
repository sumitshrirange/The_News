import React, { useEffect, useState } from "react";
import { fetchNewsByTopic } from "../config/api.js";
import { TOPIC_TOKENS } from "../config/topics.js";
import { formatDate } from "../utils/formatDate";
import { IoMdRefresh } from "react-icons/io";
import { ColorRing } from "react-loader-spinner";
import Loader from "../components/Loader.jsx";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Business() {
  const [news, setNews] = useState([]);
  const [visibleNews, setVisibleNews] = useState([]); // for pagination
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const pageSize = 8; // load 8 at a time

  const loadNews = async () => {
    try {
      setLoading(true);
      const data = await fetchNewsByTopic(TOPIC_TOKENS.science);
      setNews(data);
      setVisibleNews(data.slice(0, pageSize));
      setPage(1);
    } catch (error) {
      console.error("Failed to fetch business news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  // Load more data on scroll
  const fetchMoreData = () => {
    const nextPage = page + 1;
    const newData = news.slice(0, nextPage * pageSize);
    setVisibleNews(newData);
    setPage(nextPage);
  };

  return (
    <>
      {/* Header with Refresh */}
      <div className="pt-8 pb-2 border-b-2 border-gray-300 flex items-center justify-between">
        <h1 className="md:text-2xl text-xl uppercase">Science News</h1>
        <button
          className="flex items-center gap-1 text-sm opacity-70"
          onClick={loadNews}
        >
          <div className="mb-0.5">
            {loading ? (
              <ColorRing visible height="25" width="25" colors={["#000"]} />
            ) : (
              <IoMdRefresh className="size-5" />
            )}
          </div>
          Refresh
        </button>
      </div>

      {/* Loader or News List */}
      {loading ? (
        <Loader />
      ) : (
        <InfiniteScroll
          dataLength={visibleNews.length}
          next={fetchMoreData}
          hasMore={visibleNews.length < news.length}
          loader={
            <div className="flex justify-center py-4">
              <ColorRing visible height="30" width="30" colors={["#000"]} />
            </div>
          }
        >
          <ul className="flex flex-wrap gap-6 md:justify-between justify-center w-full mt-6">
            {visibleNews.map((article, idx) => {
              const {
                link,
                thumbnail,
                title,
                date,
                source,
                highlight = {},
              } = article;

              const newsUrl = link || highlight.link;
              const newsThumbnail = thumbnail || highlight.thumbnail;
              const newsTitle = title || highlight.title;
              const newsDate = date || highlight.date;
              const newsSource = source?.name || highlight.source?.name;

              return (
                <li key={idx} className="w-80">
                  <Link
                    to={`/news/${idx}`}
                    state={{
                      url: newsUrl,
                      title: newsTitle,
                      thumbnail: newsThumbnail,
                      name: newsSource,
                      date: newsDate,
                    }}
                  >
                    {/* Thumbnail with hover overlay */}
                    <div className="w-full h-50 relative overflow-hidden rounded-md">
                      <img
                        className="w-full h-full object-cover"
                        src={newsThumbnail}
                        alt={newsTitle}
                        loading="lazy" // Lazy load images
                      />
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <small className="text-white">Read Summary →</small>
                      </div>
                    </div>
                  </Link>

                  {/* Title + Meta */}
                  <p className="text-sm mb-1 text-gray-700">{newsTitle}</p>
                  <p className="text-xs text-gray-500">
                    {newsSource} — {formatDate(newsDate)}
                  </p>
                </li>
              );
            })}
          </ul>
        </InfiniteScroll>
      )}
    </>
  );
}
