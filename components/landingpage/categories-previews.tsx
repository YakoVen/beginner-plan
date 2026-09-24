"use client"

import CategorieCard from "./widgets/categorie-preview-card";
import { Article } from "@/interfaces/article";
import { categories } from "@/service/constants";
// removed c1 import since it does not exist, use a placeholder instead

function CategoriesPreview({ articles }: { articles: Article[] }) {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-12 py-12 bg-white">
            <div className="text-center md:text-left mb-8">
                <div className="font-extrabold text-3xl md:text-4xl mb-2">
                    Nos Produits
                </div>
                <div className="text-gray-500 text-lg">
                    Explorez par catégorie
                </div>
            </div>

            <div className='flex flex-nowrap gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4'>
                {categories.map((e, i) => (
                    <div key={i} className="snap-start flex-shrink-0">
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