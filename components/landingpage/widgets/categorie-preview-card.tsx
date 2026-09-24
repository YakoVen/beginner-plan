"use client"
import Image from "next/image";
import { Article } from "@/interfaces/article";
import { categories } from "@/service/constants";
import Link from "next/link";

function CategorieCard(
  { articles, CategorieTitle, CategorieThumbnail, Icon }:
  { articles: Article[], Icon: string, CategorieTitle: string, CategorieThumbnail: string }
) {
  const products = articles.filter((e) => categories[e.category] && categories[e.category].name == CategorieTitle);

  return (
    <div className="w-full max-w-sm bg-white border lg:w-[300px] border-gray-200 rounded-lg shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
      
      <div className="relative h-48 w-full">
        <Image 
          src={CategorieThumbnail} 
          alt={CategorieTitle} 
          fill 
          className="object-cover rounded-t-lg" 
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-gray-900 text-sm shadow-sm">
          {CategorieTitle}
        </div>
      </div>

      <div className="p-4">

        <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center mb-4">
          <div>
            <div className="text-xs font-light text-gray-500">Produits</div>
            <div className="text-base font-semibold">{products.length}+</div>
          </div>
          <div className="flex-grow" />
          <Link
            href={"/articles?categorie=" + encodeURIComponent(CategorieTitle)}
            className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Voir plus
          </Link>
        </div>

        <div className="flex gap-2 pb-2 overflow-x-auto">
          {products.filter((e) => e.active).map((e) =>
            <Link
              key={e.id}
              href={"/articles/" + e.id}
              className="rounded-lg overflow-hidden h-[70px] w-[70px] flex-shrink-0 cursor-pointer block"
            >
              <Image
                src={e.thumbnail}
                height={70}
                width={70}
                alt={e.title}
                className="object-cover w-full h-full"
              />
            </Link>
          )}

          {products.filter((e) => e.active).length === 0 && (
            <div className="rounded-lg h-[70px] w-full text-center flex justify-center items-center text-gray-400 text-sm italic gap-2 bg-gray-50">
              <i className="fa-solid fa-box-open"></i> stock rompu
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategorieCard;