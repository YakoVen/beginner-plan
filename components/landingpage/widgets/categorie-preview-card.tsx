"use client"
import Image from "next/image";
import { article } from "@/interfaces/article";
import { categories } from "@/service/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";

function CategorieCard(
  { articles, CategorieTitle, CategorieThumbnail, Icon }:
  { articles: article[], Icon: string, CategorieTitle: string, CategorieThumbnail: string }
) {
  const products = articles.filter((e) => categories[e.category].name == CategorieTitle);
  const nav = useRouter();

  return (
    // Card container: Changed to a white card with shadow and rounded corners
    <div className="w-full max-w-sm bg-white border lg:w-[300px] border-gray-200 rounded-lg shadow-sm">
      
      {/* Thumbnail: Adjusted to fill the top part of the card */}
      <div className="relative h-48 w-full">
        <Image 
          src={CategorieThumbnail} 
          alt={CategorieTitle} 
          fill 
          className="object-cover rounded-t-lg" 
        />
      </div>

      {/* Content Area: White background with padding */}
      <div className="p-4">
        
        {/* Header: Kept your original structure but restyled text */}
        <div className="flex gap-3 items-center mb-4">
          <div className="p-2 border rounded-full flex-shrink-0">
            <img width="35" height="35" src={Icon} alt="category icon" />
          </div>
          <div className="font-bold text-gray-900 text-xl">{CategorieTitle}</div>
        </div>

        {/* Products count + button: Kept structure, styled button to match theme */}
        <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center mb-4">
          <div>
            <div className="text-xs font-light text-gray-500">Produits</div>
            <div className="text-base font-semibold">{products.length}+</div>
          </div>
          <div className="flex-grow" />
          <Link
            href={"/articles?categorie=" + CategorieTitle}
            className="text-white bg-orange-600 hover:bg-orange-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Voir plus
          </Link>
        </div>

        {/* Products preview: Kept your original horizontal scroll */}
        <div className="flex gap-2 pb-2 overflow-x-auto">
          {products.filter((e) => e.active).map((e, i) =>
            <div
              key={i}
              className="rounded-lg overflow-hidden h-[70px] w-[70px] flex-shrink-0 cursor-pointer"
            >
              <Image
                src={e.thumbnail}
                height={70}
                width={70}
                alt={e.name} // Added alt text for accessibility
                onClick={() => nav.replace("/articles/" + e.id)}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          {products.filter((e) => e.active).length === 0 && (
            <div className="rounded-lg h-[70px] w-full text-center flex justify-center items-center text-gray-400 text-sm">
              stock rompu
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategorieCard;