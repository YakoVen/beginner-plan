"use client"
import { article } from "@/interfaces/article";

import FilterBar from "@/components/articles-page/filter-bar";
import FilterButtonContainer from "@/components/articles-page/filter-button-container";
import ArtcileCard from "@/components/articles-page/widgets/article-card";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { categories } from "@/service/constants";

function ArticlesListing({ articles }: { articles: article[] }) {

    const [selected, setSelected] = useState<number[]>([])
    const [search, setSearch] = useState<string>("")

    const [price, setPrice] = useState<[number,number]>([300, 5000])
    const [max, setMax] = useState<number>(0)

    const data = useSearchParams();

    useEffect(() => {

        let m = 0;
        for (let i = 0; i < articles.length; i++) {
            const element = articles[i];
            if (m < element.price) m = element.price
        }
        setMax(m);
        setPrice([0, m + m / 10]);

        const s = data.get("search");
        if (s) setSearch(s)
        if (data.get("categorie"))
            setSelected([categories.indexOf(categories.filter((c) => c.name == data.get("categorie"))[0])])
    }, [data])

    return (
        <div className="flex min-h-screen   items-stretch relative ">
            <FilterBar max={max} value={{ categories: selected, price: price }} onSelected={setSelected} onPrice={setPrice}></FilterBar>

            <div className="flex-grow flex flex-col    pt-20  ">
                <div>
                    <FilterButtonContainer clearSearch={()=>setSearch("")} value={{ categories: selected, price: price }} search={search} onChange={setSelected} />
                </div>
                <div className=" flex gap-4 lg:px-6 py-6  flex-grow flex-wrap justify-center items-stretch md:overflow-y-auto md:max-h-screen">
                    {articles.filter((e) => e.disc.toLowerCase().includes(search.toLowerCase()) || e.title.toLowerCase().includes(search.toLowerCase())).filter((e) => selected.includes(e.category) || selected.length == 0).filter((e) => e.price <= price[1] && e.price >= price[0]).map((e, i) => <ArtcileCard key={i} article={e} />)}
                </div>
            </div>
        </div>
    );
}

export default ArticlesListing;