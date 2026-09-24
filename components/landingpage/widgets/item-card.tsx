import { Article } from "@/interfaces/article";
import Image from "next/image";
import Link from "next/link";

function FeaturedCard({ article }: { article: Article }) {
    return (
        <Link
            href={`/articles/${article.id}`}
            className="group w-full max-w-xs bg-white p-3 rounded-lg shadow-sm flex-shrink-0 flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100"
        >
            {/* Thumbnail */}
            <div className="bg-zinc-200 h-44 mb-3 rounded-md relative overflow-hidden">
                <Image
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    src={article.thumbnail}
                    fill
                    sizes="(max-width: 640px) 100vw, 280px"
                    alt={article.title}
                />
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-grow">
                {/* Title */}
                <h3 className="font-semibold h-12 mb-2 text-gray-800 text-left overflow-hidden line-clamp-2">
                    {article.title}
                </h3>
                
                {/* Description (if present) */}
                {article.description && (
                    <p className="text-gray-500 text-sm text-left mb-2 line-clamp-2">
                        {article.description}
                    </p>
                )}

                {/* Price Section */}
                <div className="flex items-baseline justify-start gap-3 mb-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-blue-600 font-bold text-2xl">
                            {article.price}
                        </span>
                        <span className="text-blue-600 font-semibold text-sm">DZD</span>
                    </div>
                    {article.oldPrice && (
                        <div className="flex items-baseline gap-1">
                            <span className="text-gray-400 line-through">
                                {article.oldPrice}
                            </span>
                            <span className="text-gray-400 text-sm">DZD</span>
                        </div>
                    )}
                </div>

                {/* Rating and Sales Count */}
                {(article.sales || article.rating) && (
                    <div className="flex items-center justify-start gap-2 mt-auto text-gray-500 text-sm">
                        {article.sales && <span>{`+${article.sales} vendus`}</span>}
                        {article.sales && article.rating && <span>|</span>}
                        {article.rating && (
                            <span className="flex items-center gap-1">
                                <span>{article.rating}</span>
                                <span className="text-yellow-400 text-base">★</span>
                            </span>
                        )}
                    </div>
                )}
            </div>
        </Link>
    );
}

export default FeaturedCard;