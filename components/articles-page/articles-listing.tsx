"use client"
import { Article } from "@/interfaces/article";

import FilterBar from "@/components/articles-page/filter-bar";
import FilterButtonContainer from "@/components/articles-page/filter-button-container";
import ArticleCard from "@/components/articles-page/widgets/article-card";
import { Breadcrumbs } from "@/components/general/breadcrumbs";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { categories } from "@/service/constants";

function ArticlesListing({ articles }: { articles: Article[] }) {
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState<string>("");

  const [price, setPrice] = useState<[number, number]>([0, 5000]);
  const [max, setMax] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>("default");

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const data = useSearchParams();

  useEffect(() => {
    let m = 0;
    for (let i = 0; i < articles.length; i++) {
      const element = articles[i];
      if (m < element.price) m = element.price;
    }
    setMax(m);
    setPrice([0, m + m / 10]);

    const s = data.get("search");
    if (s) setSearch(s);

    if (data.get("categorie")) {
      const cat = categories.filter((c) => c.name == data.get("categorie"))[0];
      if (cat) {
        setSelected([categories.indexOf(cat)]);
      }
    }
  }, [data, articles]);

  let filteredArticles = articles
    .filter(
      (e) =>
        (e.description && e.description.toLowerCase().includes(search.toLowerCase())) ||
        e.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(
      (e) => selected.includes(e.category) || selected.length == 0
    )
    .filter((e) => e.price <= price[1] && e.price >= price[0]);

  if (sortOption === "price_asc") {
    filteredArticles.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price_desc") {
    filteredArticles.sort((a, b) => b.price - a.price);
  } else if (sortOption === "newest") {
    filteredArticles.sort((a, b) => String(b.id).localeCompare(String(a.id)));
  }

  return (
    <div className="flex flex-col md:flex-row h-screen pt-20 overflow-hidden">
      {/* Sidebar - Handles its own mobile responsiveness */}
      <div className="md:w-64 md:border-r md:flex-shrink-0">
        <FilterBar
          max={max}
          value={{ categories: selected, price: price }}
          onSelected={setSelected}
          onPrice={setPrice}
        />
      </div>

      {/* Main content */}
      <div className="flex-grow flex flex-col overflow-hidden">
        <div className="px-3 sm:px-4 md:px-6 pt-4 shrink-0">
          <Breadcrumbs items={[{ label: "Boutique" }]} />
          <FilterButtonContainer
            clearSearch={() => setSearch("")}
            value={{ categories: selected, price: price }}
            search={search}
            onChange={setSelected}
          />
          <div className="flex justify-between items-center py-2 text-sm text-gray-600">
            <div>
              {filteredArticles.length} produit{filteredArticles.length !== 1 ? 's' : ''} trouvé{filteredArticles.length !== 1 ? 's' : ''}
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-black'}`}
                  title="Vue Grille"
                >
                  <i className="fa-solid fa-border-all"></i>
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-black'}`}
                  title="Vue Liste"
                >
                  <i className="fa-solid fa-list"></i>
                </button>
              </div>
              <select 
                className="border rounded p-2 bg-white outline-none" 
                value={sortOption} 
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Par défaut</option>
                <option value="price_asc">Prix croissant</option>
                <option value="price_desc">Prix décroissant</option>
                <option value="newest">Plus récents</option>
              </select>
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <div className="flex-grow overflow-y-auto p-3 sm:p-4 md:p-6 pb-24 md:pb-6">
          {filteredArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <i className="fa-solid fa-box-open text-4xl mb-4"></i>
              <p className="text-lg mb-4">Aucun produit ne correspond à vos filtres.</p>
              <button 
                onClick={() => {
                  setSearch("");
                  setSelected([]);
                  setPrice([0, max + max / 10]);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "flex flex-col gap-4 max-w-4xl"}>
              {filteredArticles.map((e) => (
                <ArticleCard key={e.id} article={e} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticlesListing;
