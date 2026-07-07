import React, { useState, useEffect } from 'react';
import { Newspaper, Search, ArrowLeft, Bookmark, Heart, Send, Calendar, BookmarkCheck } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translate';

interface NewsSectionProps {
  language: string;
}

export default function NewsSection({ language }: NewsSectionProps) {
  const [news, setNews] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      try {
        const response = await fetch('/api/football?action=news');
        const data = await response.json();
        if (data.success) {
          setNews(data.news || []);
        }
      } catch (err) {
        console.error('Failed to fetch news:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const toggleBookmark = (id: number) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(bId => bId !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  const filteredNews = news.filter(art => 
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-10 flex flex-col gap-8 pb-20">
      
      {/* Visual Header */}
      <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/25 p-6 sm:p-8 overflow-hidden">
        <div className="absolute top-0 right-0 h-28 w-28 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/25">
              <Newspaper className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white">{t.latestNews}</h1>
              <p className="text-zinc-500 text-xs mt-0.5">Stay updated with breaking transfers, match previews, and tactical reports.</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Reader Layout overlay */}
      {selectedArticle ? (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/15 p-6 sm:p-8 flex flex-col gap-5">
          <button
            onClick={() => setSelectedArticle(null)}
            className="self-start flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to News list</span>
          </button>

          <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono">
            <span>{selectedArticle.category} • {selectedArticle.source}</span>
            <span>{selectedArticle.date}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">{selectedArticle.title}</h2>
          
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-zinc-850">
            <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="w-full h-full object-cover" />
          </div>

          <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line font-sans mt-2">
            {selectedArticle.content || selectedArticle.summary}
          </p>

          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-zinc-800/40">
            <button
              onClick={() => toggleBookmark(selectedArticle.id)}
              className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${
                bookmarks.includes(selectedArticle.id) ? 'text-emerald-400' : 'text-zinc-500 hover:text-white'
              }`}
            >
              <Bookmark className="h-4 w-4" />
              <span>{bookmarks.includes(selectedArticle.id) ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Regular News Grid */
        <div>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent"></div>
              <p className="mt-4 text-zinc-500 text-sm">Translating headlines...</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-12 text-zinc-500">No news articles found. Try another search terms.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredNews.map((article) => {
                const isBookmarked = bookmarks.includes(article.id);
                return (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="group rounded-2xl border border-zinc-900 bg-zinc-900/25 overflow-hidden hover:border-zinc-800 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Banner Photo */}
                      <div className="aspect-[16/10] w-full overflow-hidden border-b border-zinc-900">
                        <img 
                          src={article.imageUrl} 
                          alt={article.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>

                      {/* Content details */}
                      <div className="p-5 flex flex-col gap-2.5">
                        <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 font-bold uppercase tracking-wider">
                          <span>{article.category}</span>
                          <span>{article.date}</span>
                        </div>
                        <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-xs text-zinc-400 line-clamp-2 font-sans">
                          {article.summary}
                        </p>
                      </div>
                    </div>

                    {/* Footer actions */}
                    <div className="px-5 pb-5 pt-3 border-t border-zinc-900/40 flex justify-between items-center">
                      <span className="text-[10px] font-mono text-zinc-500 font-semibold">{article.source}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(article.id);
                        }}
                        className={`p-1.5 rounded-lg hover:bg-zinc-800/60 transition-colors ${
                          isBookmarked ? 'text-emerald-400' : 'text-zinc-600 hover:text-white'
                        }`}
                      >
                        {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
