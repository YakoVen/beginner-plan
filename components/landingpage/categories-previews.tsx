"use client"

import CategorieCard from "./widgets/categorie-preview-card";
import c1 from "@/assets/temp/1.png";

import { article } from "@/interfaces/article";
import { categories } from "@/service/constants";


function CategoriesPreview({ articles }: { articles: article[] }) {


    return (
        <div className="px-4 md:px-12 py-12 md:py-6">
            <div className="font-extrabold text-4xl">Nos Produits</div>


            <div className='overflow-x-auto  w-full'>
                <div className="flex gap-4 min-w-fit md:p-6 justify-center" >
                    {categories.map((e, i) =>
                        <CategorieCard key={i} articles={articles} Icon="https://img.icons8.com/liquid-glass/48/categorize.png" CategorieThumbnail={e.thumbnail == "" ? c1.src:e.thumbnail} CategorieTitle={e.name} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default CategoriesPreview;