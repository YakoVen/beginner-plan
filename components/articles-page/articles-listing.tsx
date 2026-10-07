"use client"
import { Article } from "@/interfaces/article";

import ItemCard from "@/components/landingpage/widgets/item-card";
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
    <div className="w-full flex flex-col pb-12">
      <div className="px-4 sm:px-6 lg:px-12 pt-6">
        <Breadcrumbs items={[{ label: "Boutique" }]} />
        
        {/* Banner Section if a category is selected */}
        {selected.length === 1 && (
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-[2rem] p-8 my-6 flex items-center justify-between">
             <div>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                   {categories[selected[0]].name}
                </h1>
                <p className="text-gray-600 max-w-md">Découvrez nos dernières nouveautés pour un quotidien connecté.</p>
             </div>
             {/* Optional category image here */}
          </div>
        )}

        {selected.length !== 1 && (
          <div className="my-6">
             <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Boutique</h1>
          </div>
        )}

        {/* Categories Pills Filter */}
        <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar mb-4">
           <button 
             onClick={() => setSelected([])} 
             className={`px-4 py-2 rounded-full whitespace-nowrap font-medium text-sm transition-colors ${selected.length === 0 ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
           >
             Tous
           </button>
           {categories.map((c, i) => (
             <button 
               key={i}
               onClick={() => setSelected([i])} 
               className={`px-4 py-2 rounded-full whitespace-nowrap font-medium text-sm transition-colors ${selected.includes(i) ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
             >
               {c.name}
             </button>
           ))}
        </div>

        {search.length > 0 && (
          <div className="mt-3 px-2 md:px-6 text-sm text-gray-700 flex items-center gap-2 mb-4">
            <span>
              Résultats pour : <span className="font-medium">{search}</span>
            </span>
            <button
              onClick={() => setSearch("")}
              className="px-2 py-1 bg-gray-400 hover:bg-gray-600 rounded-full text-white text-xs transition"
            >
              ✕
            </button>
          </div>
        )}
        
        <div className="flex justify-between items-center py-2 text-sm text-gray-600 mb-6">
          <div className="font-semibold text-gray-900">
            {filteredArticles.length} produits trouvés
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <select 
              className="border border-gray-200 rounded-lg py-2 px-4 bg-white outline-none focus:border-green-500 font-medium text-gray-700 text-sm" 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Trier par: Par défaut</option>
              <option value="price_asc">Prix croissant</option>
              <option value="price_desc">Prix décroissant</option>
              <option value="newest">Plus récents</option>
            </select>
          </div>
        </div>

        {/* Article Grid */}
        <div>
          {filteredArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <i className="fa-solid fa-box-open text-4xl mb-4"></i>
              <p className="text-lg mb-4">Aucun produit ne correspond à vos filtres.</p>
              <button 
                onClick={() => {
                  setSearch("");
                  setSelected([]);
                  setPrice([0, max + max / 10]);
                }}
                className="px-6 py-2 bg-green-700 text-white font-semibold rounded-full hover:bg-green-800 transition"
              >
                Réinitialiser
              </button>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredArticles.map((e) => (
                <ItemCard key={e.id} article={e} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticlesListing;
