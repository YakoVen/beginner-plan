"use client"

import CategorieCard from "./widgets/categorie-preview-card";
import { Article } from "@/interfaces/article";
import { categories } from "@/service/constants";
import Link from "next/link";
// removed c1 import since it does not exist, use a placeholder instead

function CategoriesPreview({ articles }: { articles: Article[] }) {
    return (
        <div id="categories" className="w-full px-4 sm:px-6 lg:px-12 py-8 bg-white scroll-mt-24">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="font-bold text-2xl md:text-3xl text-gray-900">
                        Nos catégories
                    </h2>
                </div>
                <Link href="/articles" className="text-sm font-semibold text-green-600 hover:text-green-700 transition-colors">
                    Voir toutes <i className="fa-solid fa-arrow-right text-xs ml-1"></i>
                </Link>
            </div>

            <div className='flex flex-nowrap gap-4 md:gap-6 overflow-x-auto pb-6 hide-scrollbar'>
                {categories.map((e, i) => (
                    <div key={i} className="flex-shrink-0">
                        <CategorieCard 
                            articles={articles} 
                            Icon="https://img.icons8.com/liquid-glass/48/categorize.png" 
                            CategorieThumbnail={e.thumbnail === "" ? "https://placehold.co/400x300" : e.thumbnail} 
                            CategorieTitle={e.name} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoriesPreview;