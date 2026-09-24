"use client";

import { useEffect, useState } from "react";
import EditCard from "@/components/dashboard/widget/edit-card";
import { getArticles } from "@/service/firebase/database";
import Link from "next/link";
import { Article } from "@/interfaces/article";

export default function ArticleEditorPreviewPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    getArticles().then((data) => {
      setArticles(data);
      setFilteredArticles(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredArticles(articles);
    } else {
      const lower = search.toLowerCase();
      setFilteredArticles(
        articles.filter(
          (a) =>
            a.title.toLowerCase().includes(lower) ||
            a.category?.toString().includes(lower)
        )
      );
    }
  }, [search, articles]);

  return (
    <div className="min-h-screen py-6 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Articles</h1>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Toggle Buttons */}
          <div className="flex bg-gray-100 rounded-lg p-1 shrink-0">
            <button 
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-black'}`}
              title="Vue Grille"
            >
              <i className="fa-solid fa-border-all"></i>
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-black'}`}
              title="Vue Liste"
            >
              <i className="fa-solid fa-list"></i>
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-search text-gray-400"></i>
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Rechercher un article..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className={`flex gap-4 flex-wrap ${viewMode === 'list' ? 'flex-col' : 'justify-center'}`}>
          <div className={viewMode === 'list' ? 'h-32 w-full max-w-4xl bg-gray-100 rounded-2xl animate-pulse' : 'h-80 w-56 bg-gray-100 rounded-2xl animate-pulse'}></div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className={viewMode === 'list' ? 'h-32 w-full max-w-4xl bg-gray-100 rounded-2xl animate-pulse' : 'h-80 w-56 bg-gray-100 rounded-2xl animate-pulse'}></div>
          ))}
        </div>
      ) : (
        <div className={`flex gap-4 flex-wrap ${viewMode === 'list' ? 'flex-col items-center' : 'justify-center'}`}>
          <div className={viewMode === 'list' ? 'h-16 w-full max-w-4xl text-2xl text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl flex justify-center items-center hover:bg-gray-50 hover:border-gray-300 transition-all' : 'h-80 w-56 text-4xl text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl flex justify-center items-center hover:bg-gray-50 hover:border-gray-300 transition-all'}>
            <Link
              href="/dashboard/articles/add"
              className={`h-full w-full flex ${viewMode === 'list' ? 'flex-row' : 'flex-col'} justify-center items-center gap-2`}
              aria-label="Add new article"
            >
              <i className="fa-solid fa-plus text-2xl"></i>
              <span className="text-sm font-medium">Nouvel Article</span>
            </Link>
          </div>

          {filteredArticles.map((e) => (
            <EditCard article={e} key={e.id} viewMode={viewMode} />
          ))}

          {filteredArticles.length === 0 && articles.length > 0 && (
            <div className="w-full text-center py-12 text-gray-500">
              <p>Aucun article trouvé pour "{search}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
