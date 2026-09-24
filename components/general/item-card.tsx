"use client";
import { Article } from "@/interfaces/article";
import { getArticles } from "@/service/firebase/database";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

function ItemCard() {
    const [articles, setArticles] = useState<Article[]>([]);

    // Fetch articles once
    useEffect(() => {
        getArticles().then((res) => setArticles(res));
    }, []);

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 p-4">
            {articles.map((item) => (
                <Link
                    key={item.id}
                    href={`/articles/${item.id}`}
                    className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition cursor-pointer"
                >
                    {/* Image */}
                    <div className="relative h-40 sm:h-48">
                        <Image
                            src={item.thumbnail}
                            alt={item.title}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                            className="object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="p-3 flex flex-col gap-2">
                        {/* Title */}
                        <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
                            {item.title}
                        </h2>

                        {/* Prices */}
                        <div className="flex items-baseline gap-2">
                            {item.oldPrice && (
                                <span className="text-gray-400 line-through text-xs">
                                    {item.oldPrice} دج
                                </span>
                            )}
                            <span className="text-red-600 font-bold text-lg">
                                {item.price} دج
                            </span>
                        </div>

                        {/* Rating & Sales */}
                        {(item.rating || item.sales) && (
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                {item.rating && (
                                    <>
                                        <span className="text-yellow-500">★</span>
                                        <span>{item.rating}</span>
                                    </>
                                )}
                                {item.rating && item.sales && <span>|</span>}
                                {item.sales && <span>{item.sales} مبيع</span>}
                            </div>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default ItemCard;
