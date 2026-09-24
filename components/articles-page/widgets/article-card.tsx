import { Article } from "@/interfaces/article";
import Image from "next/image";
import Link from "next/link";

function ArticleCard({ article, viewMode = "grid" }: { article: Article, viewMode?: "grid" | "list" }) {
  const hasDiscount = article.oldPrice && article.oldPrice > article.price;

  return (
    <Link
      href={`/articles/${article.id}`}
      className={`group w-full max-w-full flex ${viewMode === 'list' ? 'flex-row items-stretch' : 'flex-col'} rounded-2xl overflow-hidden bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100`}
    >
      {/* Thumbnail */}
      <div className={`relative ${viewMode === 'list' ? 'w-1/3 min-w-[120px] sm:w-48 aspect-square sm:aspect-[4/3]' : 'w-full aspect-[4/3]'} overflow-hidden bg-gray-50 flex-shrink-0`}>
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Promo badge */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-blue-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-full shadow-sm">
            Promo
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`p-4 flex flex-col flex-grow ${viewMode === 'list' ? 'justify-center' : ''}`}>
        {/* Title */}
        <h3 className={`font-semibold text-gray-800 ${viewMode === 'list' ? 'text-base sm:text-lg mb-2' : 'text-sm sm:text-base leading-snug line-clamp-2 min-h-[2.5rem]'}`}>
          {article.title}
        </h3>
        
        {viewMode === 'list' && article.description && (
          <p className="hidden sm:block text-gray-500 text-sm line-clamp-2 mb-3">
            {article.description}
          </p>
        )}

        {/* Price & Action */}
        <div className="mt-auto pt-2 flex items-end justify-between">
          <div className="flex flex-col">
            <span className={`${viewMode === 'list' ? 'text-xl' : 'text-lg'} font-bold text-blue-600`}>
              {article.price} DZD
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                {article.oldPrice} DZD
              </span>
            )}
          </div>
          <span className="text-xs sm:text-sm font-medium text-gray-400 group-hover:text-blue-600 transition-colors flex items-center gap-1">
            Voir <i className="fa-solid fa-arrow-right text-[10px] sm:text-xs"></i>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ArticleCard;
