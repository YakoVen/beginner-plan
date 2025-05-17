"use client"

import CategorieCard from "./widgets/categorie-preview-card";
import c1 from "@/assets/temp/1.webp";

import { article } from "@/interfaces/article";
import { categories } from "@/service/constants";


function CategoriesPreview({ articles }: { articles: article[] }) {


    return (
        <div className="px-4 md:px-12 py-12 md:py-6">
            <div className="font-extrabold text-4xl">Nos Produits</div>


            <div className='overflow-x-auto  w-full'>
                <div className="flex gap-4 min-w-fit md:p-6 justify-center" >
                    {categories.map((e, i) =>
                        <CategorieCard key={i} articles={articles} Icon="https://img.icons8.com/external-nawicon-glyph-nawicon/64/FFFFFF/external-dishes-kitchen-nawicon-glyph-nawicon.png" CategorieThumbnail={c1.src} CategorieTitle={e.name} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default CategoriesPreview;