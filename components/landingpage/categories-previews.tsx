"use client"

import CategorieCard from "./widgets/categorie-preview-card";
import c1 from "@/assets/temp/1.png";
import { article } from "@/interfaces/article";
import { categories } from "@/service/constants";

function CategoriesPreview({ articles }: { articles: article[] }) {
    return (
        // Main container with responsive padding
        <div className="w-full px-4 sm:px-6 lg:px-12 py-12">
            {/* Title with responsive text size and alignment */}
            <div className="font-extrabold text-3xl md:text-4xl text-center md:text-left mb-8">
                Nos Produits
            </div>

            {/* 
              - `overflow-x-auto`: Enables horizontal scrolling.
              - `flex-nowrap`: Keeps all items in a single row.
              - `snap-x snap-mandatory`: Creates a smooth snapping scroll effect.
              - `pb-4`: Adds padding to prevent the scrollbar from overlapping the content.
            */}
            <div className='flex flex-nowrap gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4'>
                {categories.map((e, i) => (
                    // Wrapper for each card to control snapping and shrinking behavior
                    <div key={i} className="snap-start flex-shrink-0">
                        <CategorieCard 
                            articles={articles} 
                            Icon="https://img.icons8.com/liquid-glass/48/categorize.png" 
                            CategorieThumbnail={e.thumbnail === "" ? c1.src : e.thumbnail} 
                            CategorieTitle={e.name} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoriesPreview;