"use client"
import { article } from "@/interfaces/article";

import FilterBar from "@/components/articles-page/filter-bar";
import FilterButtonContainer from "@/components/articles-page/filter-button-container";
import ArtcileCard from "@/components/articles-page/widgets/article-card";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { categories } from "@/service/constants";

function ArticlesListing({ articles }: { articles: article[] }) {
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState<string>("");

  const [price, setPrice] = useState<[number, number]>([300, 5000]);
  const [max, setMax] = useState<number>(0);

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
      setSelected([
        categories.indexOf(
          categories.filter((c) => c.name == data.get("categorie"))[0]
        ),
      ]);
    }
  }, [data]);

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden relative">
      {/* Sidebar (hidden on small screens, visible on md+) */}
      <div className="hidden md:block w-64 border-r">
        <FilterBar
          max={max}
          value={{ categories: selected, price: price }}
          onSelected={setSelected}
          onPrice={setPrice}
        />
      </div>

      {/* Main content */}
      <div className="flex-grow flex flex-col pt-16 md:pt-20">
        <div className="px-3 sm:px-4 md:px-6">
          <FilterButtonContainer
            clearSearch={() => setSearch("")}
            value={{ categories: selected, price: price }}
            search={search}
            onChange={setSelected}
          />
        </div>

        {/* Article Grid */}
        <div className="flex-grow overflow-y-auto p-3 sm:p-4 md:p-6">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articles
              .filter(
                (e) =>
                  e.disc.toLowerCase().includes(search.toLowerCase()) ||
                  e.title.toLowerCase().includes(search.toLowerCase())
              )
              .filter(
                (e) => selected.includes(e.category) || selected.length == 0
              )
              .filter((e) => e.price <= price[1] && e.price >= price[0])
              .map((e, i) => (
                <ArtcileCard key={i} article={e} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlesListing;
