"use client";
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
            <div className="bg-zinc-100 h-44 mb-3 rounded-md relative overflow-hidden flex items-center justify-center p-4">
                <div className="absolute top-2 left-2 bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                    Nouveau
                </div>
                <Image
                    className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110 mix-blend-multiply"
                    src={article.thumbnail}
                    fill
                    sizes="(max-width: 640px) 100vw, 280px"
                    alt={article.title}
                />
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-grow mt-3">
                {/* Title */}
                <h3 className="font-semibold text-gray-800 text-left mb-1 truncate text-sm">
                    {article.title}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center justify-start gap-1 mb-2 text-xs text-gray-500">
                    <span className="text-yellow-400">★★★★☆</span>
                    <span>4.8</span>
                    <span>(124)</span>
                </div>

                {/* Price Section */}
                <div className="flex items-baseline justify-start gap-2 mb-4">
                    <div className="flex items-baseline gap-1">
                        <span className="text-gray-900 font-extrabold text-lg">
                            {article.price}
                        </span>
                        <span className="text-gray-900 font-bold text-sm">DZD</span>
                    </div>
                    {article.oldPrice && (
                        <div className="flex items-baseline gap-1">
                            <span className="text-gray-400 line-through text-sm">
                                {article.oldPrice}
                            </span>
                            <span className="text-gray-400 text-xs">DZD</span>
                        </div>
                    )}
                </div>

                {/* Details Button */}
                <button className="mt-auto w-full bg-green-700 hover:bg-green-800 text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <i className="fa-solid fa-eye"></i> Voir les détails
                </button>
            </div>
        </Link>
    );
}

export default FeaturedCard;